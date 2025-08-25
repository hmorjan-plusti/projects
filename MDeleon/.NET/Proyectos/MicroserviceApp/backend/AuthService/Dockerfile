# 1. Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar archivos del proyecto
COPY . .

# Restaurar dependencias y compilar
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# 2. Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Copiar los archivos publicados
COPY --from=build /app/publish .

# Exponer puerto
EXPOSE 80

# Ejecutar la app
ENTRYPOINT ["dotnet", "AuthService.dll"]
