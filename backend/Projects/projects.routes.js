import express from 'express'
import { createProjectController, deleteProjectController, getProjectIdController, getProjectsController, updateProjectController } from '../Projects/index.js'

const projectsRoute = express.Router()

projectsRoute.get('/', getProjectsController)
projectsRoute.get('/:id', getProjectIdController)
projectsRoute.post('/', createProjectController)
projectsRoute.put('/:id', updateProjectController)
projectsRoute.delete('/:id', deleteProjectController)

export default projectsRoute