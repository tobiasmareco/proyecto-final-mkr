import Project from '../Projects/projects.model.js';
import User from '../Users/users.model.js';
import { returnError } from '../helpers/returnError.js';
import {
    createTaskRepository,
    deleteTaskRepository,
    getTaskIdRepository,
    getTasksRepository,
    taskRepository,
    updateTaskRepository
} from './index.js'
import Task from './tasks.model.js';

export const createTaskService = async (newTask, userId) => {
    try {
        console.log(userId)
        const { premium } = await User.findById(userId)
        const tasks = await Task.find({ projectId: newTask.projectId }) || [];
        if (!premium && tasks.length >= 4) {
            return { error: returnError(404, 'El usuario no posee cuenta premium, solo es posible tener 4 tareas.') }
        }
        const task = await taskRepository.CREATE_TASK(newTask);
        return { result: task }
    } catch (error) {
        return { error: returnError(403, error.message) }
    }
}


export const getTasksService = async (projectId) => {
    try {

        const tasks = await taskRepository.GET_TASKS(projectId);
        if (!tasks) {
            return { error: returnError(404, "El Proyecto no tiene tareas.") }
        }
        return { result: tasks }
    } catch (error) {
        return { error: returnError(403, error.message) }
    }
}
export const getTaskIdService = async (taskId) => {
    console.log('entre', taskId)
    try {
        const task = await taskRepository.GET_TASK_ID(taskId);
        if (!task) {
            return { error: returnError(404, `No se ha encontrado la tarea con id ${taskId}`) }
        }
        return { result: task }
    } catch (error) {
        return { error: returnError(403, error.message) }
    }
}

export const updateTaskService = async (task) => {
    // llamamos a la función updateTaskRepository
    const response = await updateTaskRepository({
        ...task,
        taskId: task.params.id,
        taskBody: task.body
    })
    // verificamos si la respuesta de la base de datos es un error, en caso afirmativo devolvemos un objeto con la información del error
    if (response.response === 'error') {
        return {
            error: response
        }
    }
    // si no hay error devolvemos un objeto con la información actualizada de la tarea
    return {
        result: response.result
    }
}

export const deleteTaskService = async (taskId) => {
    const response = await deleteTaskRepository(taskId) //Llamamos a la función deleteTaskRepository
    if (response.response === 'error') { // Si la respuesta indica un error, devuelve un objeto con un error
        return {
            error: response
        }
    }
    return {
        result: response.result
    } // Si la respuesta es exitosa, devuelve el resultado de la operación
}
