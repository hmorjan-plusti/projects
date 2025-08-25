namespace DemandAuth.Api.Models;

public class TrainRequest
{
    public string Sku { get; set; } = "ABC123";
    public int Horizon { get; set; } = 7;
}

public class ForecastOutput
{
    public float[] ForecastedQuantity { get; set; } = Array.Empty<float>();
    public float[] LowerBoundForecastedQuantity { get; set; } = Array.Empty<float>();
    public float[] UpperBoundForecastedQuantity { get; set; } = Array.Empty<float>();
}
