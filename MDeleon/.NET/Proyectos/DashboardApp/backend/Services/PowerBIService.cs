using Microsoft.Identity.Client;
using Microsoft.PowerBI.Api;
using Microsoft.PowerBI.Api.Models;
using Microsoft.Rest;

namespace DashboardApp.Backend.Services;

public class PowerBIService
{
    private readonly IConfiguration _config;

    public PowerBIService(IConfiguration config) => _config = config;

    public async Task<(string EmbedToken, string EmbedUrl)> GetReportEmbedAsync()
    {
        var authorityUrl = _config["PowerBI:AuthorityUrl"]
            ?? throw new InvalidOperationException("PowerBI:AuthorityUrl no configurado.");
        var clientId = _config["PowerBI:ClientId"]
            ?? throw new InvalidOperationException("PowerBI:ClientId no configurado.");
        var clientSecret = _config["PowerBI:ClientSecret"]
            ?? throw new InvalidOperationException("PowerBI:ClientSecret no configurado.");
        var scope = _config["PowerBI:Scope"] ?? "https://analysis.windows.net/powerbi/api/.default";
        var apiUrl = _config["PowerBI:ApiUrl"] ?? "https://api.powerbi.com/";

        // Validar que no sean valores de placeholder
        if (authorityUrl.Contains("YOUR_TENANT_ID") || clientId.Contains("YOUR_CLIENT_ID") || clientSecret.Contains("YOUR_CLIENT_SECRET"))
        {
            throw new InvalidOperationException(
                "Los valores de configuración de PowerBI contienen placeholders. " +
                "Por favor configura los valores reales en appsettings.Development.json o variables de entorno.");
        }

        if (!Guid.TryParse(_config["PowerBI:WorkspaceId"], out var workspaceId))
            throw new Exception("PowerBI:WorkspaceId inválido.");
        if (!Guid.TryParse(_config["PowerBI:ReportId"], out var reportId))
            throw new Exception("PowerBI:ReportId inválido.");

        var app = ConfidentialClientApplicationBuilder
            .Create(clientId)
            .WithClientSecret(clientSecret)
            .WithAuthority(authorityUrl)
            .Build();

        var authResult = await app.AcquireTokenForClient(new[] { scope }).ExecuteAsync();
        var tokenCredentials = new TokenCredentials(authResult.AccessToken, "Bearer");

        using var pbiClient = new PowerBIClient(new Uri(apiUrl), tokenCredentials);

        _ = await pbiClient.Reports.GetReportInGroupAsync(workspaceId, reportId);

        var tokenResponse = await pbiClient.Reports.GenerateTokenAsync(
            workspaceId,
            reportId,
            new GenerateTokenRequest(accessLevel: "view")
        );

        var embedUrl = $"https://app.powerbi.com/reportEmbed?reportId={reportId}&groupId={workspaceId}";

        return (tokenResponse.Token, embedUrl);
    }
}
