# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar csproj y restaurar dependencias
COPY ["Plataforma.Api/Plataforma.Api.csproj", "Plataforma.Api/"]
RUN dotnet restore "Plataforma.Api/Plataforma.Api.csproj"

# Instalar dotnet-ef tool
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Copiar todo y compilar
COPY . .
WORKDIR "/src/Plataforma.Api"
RUN dotnet ef database update && dotnet publish -c Release -o /app/publish
RUN cp plataforma.db /app/publish/plataforma.db

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
COPY --from=build /src/Plataforma.Api/plataforma.db ./plataforma.db
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "Plataforma.Api.dll"]
