import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { conectDatabase } from './config/conectDatabase.js'
import projectsRoute from './Projects/projects.routes.js'
import tasksRoutes from './Tasks/tasks.routes.js'
import usersRoutes from './Users/users.routes.js'
import authRoutes from './Auth/auth.routes.js'
const app = express()

//~Conectar a la base de datos.
conectDatabase()

//~Habilitar JSON-EXPRESSS - CORS.
app.use(express.json())

//~Rutas de la Aplicacion.
app.use('/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/projects', projectsRoute)
app.use('/api/tasks', tasksRoutes)

//~Levantar el servidor.
app.listen(4000, () => {
  console.log('listening on port 4000')
})