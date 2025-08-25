using Microsoft.ML.Data;

namespace PlatformApp.Models
{
    // Modelo de entrada para entrenamiento y predicción ML
    public class InputData
    {
        public float Feature1 { get; set; }
        public float Feature2 { get; set; }

        [ColumnName("Label")] // ✅ ML.NET usará esta propiedad como etiqueta para entrenamiento
        public float Label { get; set; }  // ← Esta propiedad es obligatoria para el entrenamiento
    }

    // Resultado de la predicción
    public class PredictionResult
    {
        public float Score { get; set; }
    }
}
