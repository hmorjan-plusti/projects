import request from 'supertest';
import { app, server } from './app.js';

afterAll((done) => {
  server.close(done); // Cierra el servidor después de las pruebas
});

describe('GET /movies', () => {
  test('should return an empty array initially', async () => {
    const response = await request(app).get('/movies');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe('POST /movies', () => {
  test('should create a new movie', async () => {
    const newMovie = {
      title: "Inception",
      director: "Christopher Nolan",
      year: 2010,
      genre: ["Sci-Fi", "Thriller"],
      duration: "148 min",
      poster: "https://example.com/inception.jpg"
    };

    const response = await request(app)
      .post('/movies')
      .send(newMovie)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newMovie);
    expect(response.body.id).toBeDefined();
  });
});
