using System.Net.Http;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace backend.Services;

public class ExchangeRateService
{
    private readonly HttpClient _http;
    private readonly IConfiguration _config;

    public ExchangeRateService(HttpClient http, IConfiguration config)
    {
        _http = http;
        _config = config;
    }

    public async Task<double> ConvertCurrency(string from, string to, double amount)
    {
        var baseUrl = _config["ExchangeRateApi:BaseUrl"]; // e.g. https://api.apilayer.com/exchangerates_data/convert
        var apiKey = _config["ExchangeRateApi:AccessKey"];
        var url = $"{baseUrl}?from={from}&to={to}&amount={amount}";

        try
        {
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("apikey", apiKey);

            using var response = await _http.SendAsync(request);
            response.EnsureSuccessStatusCode();

            using var contentStream = await response.Content.ReadAsStreamAsync();
            var json = await JsonDocument.ParseAsync(contentStream);

            if (json.RootElement.TryGetProperty("result", out var result))
            {
                return result.GetDouble();
            }

            throw new Exception("No se encontró el campo 'result' en la respuesta.");
        }
        catch (Exception ex)
        {
            throw new Exception($"Error al convertir moneda: {ex.Message}");
        }
    }
}
