import express from 'express'
import { createProjectController, deleteProjectController, getProjectIdController, getProjectsController, updateProjectController } from '../Projects/index.js'
import { validatorCreateProject, validatorUpdateProject } from './projects.validator.js'

const projectsRoute = express.Router()

projectsRoute.get('/', getProjectsController)
projectsRoute.get('/:id', getProjectIdController)
projectsRoute.post('/', validatorCreateProject, createProjectController)
projectsRoute.put('/:id',validatorUpdateProject, updateProjectController)
projectsRoute.delete('/:id', deleteProjectController)

export default projectsRoute