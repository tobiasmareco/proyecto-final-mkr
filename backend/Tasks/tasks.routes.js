import express from 'express'
import {
    createTaskController,
    deleteTaskController,
    getTaskIdController,
    getTasksController,
    updateTaskController
} from '../Tasks/index.js'
import {
    validatorCreateTask,
    validatorUpdateTask
} from './tasks.validator.js'
const tasksRoutes = express.Router()

tasksRoutes.get('/', getTasksController)
tasksRoutes.get('/:id', getTaskIdController)
tasksRoutes.post('/', validatorCreateTask, createTaskController)
taskRoutes.put('/:id', validatorUpdateTask, updateTaskController)
tasksRoutes.delete('/:id', deleteTaskController)


export default tasksRoutes
