using DemandAuth.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.ML;
using Microsoft.ML.Transforms.TimeSeries; // necesario para CreateTimeSeriesEngine

namespace DemandAuth.Api.Services;

public class MLService
{
    private readonly AppDbContext _db;
    private readonly string _modelsDir;
    private readonly MLContext _ml;

    public MLService(AppDbContext db, IWebHostEnvironment env)
    {
        _db = db;
        _modelsDir = Path.Combine(env.ContentRootPath, "models");
        Directory.CreateDirectory(_modelsDir);
        _ml = new MLContext(seed: 1);
    }

    // Fila mínima para el modelo (univariado por cantidad)
    private class ModelRow
    {
        public float Quantity { get; set; }
    }

    private async Task<List<ModelRow>> LoadSeriesAsync(string sku)
    {
        var rows = await _db.Sales
            .Where(s => s.Sku == sku)
            .OrderBy(s => s.Timestamp)
            .Select(s => new ModelRow { Quantity = s.Quantity })
            .ToListAsync();

        return rows;
    }

    /// <summary>
    /// Entrena un modelo SSA por SKU y guarda models/{sku}.zip.
    /// Devuelve métricas (MAE/RMSE) calculadas contra un holdout simple.
    /// </summary>
    public async Task<object> TrainAsync(string sku, int horizon)
    {
        var data = await LoadSeriesAsync(sku);
        if (data.Count < 30)
            throw new InvalidOperationException("Se requieren al menos 30 registros para entrenar.");

        // Holdout simple: ~20% o al menos 1 punto, acotado por el horizon de eval
        var testCount = Math.Min(horizon, Math.Max(1, data.Count / 5));
        var trainCount = data.Count - testCount;
        var train = data.Take(trainCount).ToList();
        var test = data.Skip(trainCount).ToList();

        // -------- Entrenamiento para evaluación (horizon = testCount)
        var dvTrain = _ml.Data.LoadFromEnumerable(train);
        var pipelineEval = _ml.Forecasting.ForecastBySsa(
            outputColumnName: nameof(ForecastOutput.ForecastedQuantity),
            inputColumnName: nameof(ModelRow.Quantity),
            windowSize: 7,
            seriesLength: Math.Max(30, train.Count),
            trainSize: train.Count,
            horizon: testCount,
            confidenceLevel: 0.95f
        );

        var modelForEval = pipelineEval.Fit(dvTrain);

        // Predicción sobre holdout para métricas (ML.NET 3.x usa Predict())
        var engineEval = modelForEval.CreateTimeSeriesEngine<ModelRow, ForecastOutput>(_ml);
        var predEval = engineEval.Predict();

        double mae = 0, mse = 0;
        for (int i = 0; i < testCount; i++)
        {
            var err = test[i].Quantity - predEval.ForecastedQuantity[i];
            mae += Math.Abs(err);
            mse += err * err;
        }
        mae /= testCount;
        mse /= testCount;
        var rmse = Math.Sqrt(mse);

        // -------- Entrenamiento final con TODOS los datos y guardado (horizon = solicitado)
        var dvFull = _ml.Data.LoadFromEnumerable(data);
        var pipelineFull = _ml.Forecasting.ForecastBySsa(
            outputColumnName: nameof(ForecastOutput.ForecastedQuantity),
            inputColumnName: nameof(ModelRow.Quantity),
            windowSize: 7,
            seriesLength: Math.Max(30, data.Count),
            trainSize: data.Count,
            horizon: horizon,          // El modelo se guarda con este horizonte por defecto
            confidenceLevel: 0.95f
        );

        var finalModel = pipelineFull.Fit(dvFull);
        var modelPath = Path.Combine(_modelsDir, $"{sku}.zip");
        using (var fs = File.Create(modelPath))
            _ml.Model.Save(finalModel, dvFull.Schema, fs);

        return new
        {
            sku,
            horizon,
            metrics = new { mae, rmse },
            modelPath
        };
    }

    /// <summary>
    /// Carga el modelo guardado para el SKU y devuelve el pronóstico.
    /// El horizonte usado es el configurado en el entrenamiento (o el que
    /// el pipeline haya guardado). ML.NET 3.x usa Predict().
    /// </summary>
    public object Predict(string sku, int horizon)
    {
        var modelPath = Path.Combine(_modelsDir, $"{sku}.zip");
        if (!File.Exists(modelPath))
            throw new FileNotFoundException("Modelo no encontrado. Entrena primero.", modelPath);

        ITransformer model;
        using (var fs = File.OpenRead(modelPath))
            model = _ml.Model.Load(fs, out _);

        // Notas:
        // - En ML.NET 3.x TimeSeriesPredictionEngine.Predict() retorna el pronóstico
        //   con el 'horizon' que se estableció al entrenar el pipeline.
        // - Si quieres reconfigurar el horizonte, debes volver a entrenar con ese horizon.
        var engine = model.CreateTimeSeriesEngine<ModelRow, ForecastOutput>(_ml);
        var output = engine.Predict();

        return new
        {
            sku,
            // el horizon real es la longitud de los arrays devueltos por Predict()
            horizon = output.ForecastedQuantity?.Length ?? 0,
            forecast = output.ForecastedQuantity,
            lower = output.LowerBoundForecastedQuantity,
            upper = output.UpperBoundForecastedQuantity
        };
    }

    public IEnumerable<string> ListModels()
    {
        return Directory.EnumerateFiles(_modelsDir, "*.zip").Select(Path.GetFileName)!;
    }
}
