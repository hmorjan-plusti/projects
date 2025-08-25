using System.Data;
using Dapper;
using Microsoft.Data.Sqlite;

namespace DashboardApp.Backend.Data
{
    public class DapperContext
    {
        private readonly string _connectionString;

        public DapperContext()
        {
            _connectionString = "Data Source=dashboard.db";
        }

        public IDbConnection CreateConnection()
            => new SqliteConnection(_connectionString);

        public async Task EnsureDatabaseAsync()
        {
            using var connection = CreateConnection();
            var sql = @"CREATE TABLE IF NOT EXISTS Users (
                            Id INTEGER PRIMARY KEY AUTOINCREMENT,
                            Username TEXT NOT NULL,
                            PasswordHash TEXT NOT NULL
                        );";
            await connection.ExecuteAsync(sql);
        }
    }
}
