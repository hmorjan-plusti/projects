const { z } = require('zod')

// Definir el esquema base de la película
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  director: z.string({
    invalid_type_error: 'Director must be a string',
    required_error: 'Director is required'
  }),
  year: z
    .number({
      invalid_type_error: 'Year must be a number',
      required_error: 'Year is required'
    })
    .int()
    .min(1888, { message: 'Year must be greater than or equal to 1888' })
    .max(2077, { message: 'Year must be less than or equal to 2077' }),
  genre: z.array(
    z.string({
      invalid_type_error: 'Genre must be an array of strings',
      required_error: 'Genre is required'
    })
  ),
  duration: z.string({
    invalid_type_error: 'Duration must be a string',
    required_error: 'Duration is required'
  }),
  poster: z
    .string()
    .url({
      invalid_type_error: 'Poster must be a valid URL',
      required_error: 'Poster is required'
    }),
  rate: z.number().optional() // Calificación no obligatoria
})

// Extender el esquema para hacerlo parcialmente opcional
const partialMovieSchema = movieSchema.extend({
  title: z.string().optional(),
  director: z.string().optional(),
  year: z.number().optional(),
  genre: z.array(z.string()).optional(),
  duration: z.string().optional(),
  poster: z.string().url().optional(),
  rate: z.number().optional()
})

module.exports = {
  movieSchema,
  partialMovieSchema
}
