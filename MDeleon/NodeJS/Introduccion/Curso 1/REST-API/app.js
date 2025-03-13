import express from 'express'
import { MovieController } from './controllers/movies.js'

const app = express()
app.use(express.json())

// Rutas para el controlador de películas
app.get('/movies', MovieController.getAll)
app.get('/movies/:id', MovieController.getById)
app.post('/movies', MovieController.create)
app.delete('/movies/:id', MovieController.delete)
app.put('/movies/:id', MovieController.update)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})