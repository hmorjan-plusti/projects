# build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore Plataforma.API/Plataforma.API.csproj
RUN dotnet publish Plataforma.API/Plataforma.API.csproj -c Release -o /app/publish

# run
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8080
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "Plataforma.API.dll"]
