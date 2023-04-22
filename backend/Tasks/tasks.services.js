import {
    createTaskRepository,
    deleteTaskRepository,
    getTaskIdRepository,
    getTasksRepository,
    updateTaskRepository
} from './index.js'

export const createTaskService = async (task) => {
    // se llama a createTaskRepository para crear la tarea en la base de datos, 
    const response = await createTaskRepository({
        ...task
    })
    // si la respuesta indica que hubo un error, se devuelve un error
    if (response.response === 'error') {
        return {
            error: response
        }
    }
    // si la respuesta fue exitosa, se devuelve una respuesta con la tarea correspondiente
    return {
        result: response.result
    }
}

export const getTasksService = async () => {
    // Llamamos a la función getTasksRepository 
    const response = await getTasksRepository()
    // Si la respuesta de getTasksRepository es un error, se devuelve un error
    if (response.response === 'error') {
        return {
            error: response
        }
    }
    // Si no hay error, devolvemos un objeto con la propiedad result que contiene la lista de tareas
    return {
        result: response.result
    }
}

export const getTaskIdService = async (taskId) => {
    const response = await getTaskIdRepository(taskId); // Se llama a la función getTaskIdRepository

    // Si la respuesta del repositorio tiene un atributo 'response' igual a 'error', se retorna un objeto con el error
    if (response.response === 'error') {
        return {
            error: response
        }
    }

    return {
        result: response.result
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
