using Microsoft.ML;
using PlatformApp.Models;

namespace PlatformApp.Services
{
    public class MLService
    {
        private readonly string _modelPath = "model.zip";
        private readonly MLContext _mlContext = new();

        public void Train(IEnumerable<InputData> data)
        {
            var trainData = _mlContext.Data.LoadFromEnumerable(data);

            // El pipeline ahora sabe que la etiqueta es 'Label'
            var pipeline = _mlContext.Transforms.Concatenate("Features", nameof(InputData.Feature1), nameof(InputData.Feature2))
                .Append(_mlContext.Regression.Trainers.Sdca(labelColumnName: "Label", featureColumnName: "Features"));

            var model = pipeline.Fit(trainData);
            _mlContext.Model.Save(model, trainData.Schema, _modelPath);
        }

        public float Predict(InputData input)
        {
            if (!File.Exists(_modelPath))
                throw new FileNotFoundException("Model not found");

            var model = _mlContext.Model.Load(_modelPath, out _);
            var predEngine = _mlContext.Model.CreatePredictionEngine<InputData, PredictionResult>(model);
            return predEngine.Predict(input).Score;
        }
    }
}
