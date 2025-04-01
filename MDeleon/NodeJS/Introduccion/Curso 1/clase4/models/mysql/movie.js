import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones simultáneas
  queueLimit: 0
});

console.log('✅ Database connection pool created');

export class MovieModel {
  // Obtener todas las películas (opcionalmente filtradas por género)
  static async getAll({ genre }) {
    try {
      let query = `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie`;
      const params = [];

      if (genre) {
        query += ` WHERE genre = ?`;
        params.push(genre);
      }

      const [rows] = await pool.query(query, params);
      return rows;
    } catch (error) {
      console.error('❌ Error fetching movies:', error);
      throw error;
    }
  }

  // Obtener una película por su ID
  static async getById({ id }) {
    try {
      const query = `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);`;
      const [rows] = await pool.query(query, [id]);

      if (rows.length === 0) {
        throw new Error('Movie not found');
      }

      return rows[0];
    } catch (error) {
      console.error('❌ Error fetching movie by ID:', error);
      throw error;
    }
  }

  // Eliminar una película por su ID
  static async delete({ id }) {
    try {
      const query = `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`;
      const [result] = await pool.query(query, [id]);

      if (result.affectedRows === 0) {
        throw new Error('Movie not found');
      }

      return { message: 'Movie deleted successfully' };
    } catch (error) {
      console.error('❌ Error deleting movie:', error);
      throw error;
    }
  }

  // Actualizar una película por su ID
  static async update({ id, input }) {
    try {
      const { title, year, director, duration, poster, rate } = input;

      const query = `UPDATE movie 
                     SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? 
                     WHERE id = UUID_TO_BIN(?);`;
      
      const [result] = await pool.query(query, [title, year, director, duration, poster, rate, id]);

      if (result.affectedRows === 0) {
        throw new Error('Movie not found');
      }

      return { message: 'Movie updated successfully' };
    } catch (error) {
      console.error('❌ Error updating movie:', error);
      throw error;
    }
  }
}
