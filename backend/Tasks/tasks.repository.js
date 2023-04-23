import Task from './tasks.model.js'


export const taskRepository = {
  CREATE_TASK: async (task) => {
    return await Task.create(task)
  },
  GET_TASKS: async (projectId) => {
    return await Task.find({ projectId })
  },
  GET_TASK_ID: async (taskId) => {
    return await Task.findById(taskId)
  },
  UPDATE_TASK: async (task, projectId) => {

  },
  DELETE_TASK: async (taskId, projectId) => {

  }
}






export const createTaskRepository = async ({
  title,
  description,
  projectId,
  status,
  priority
}) => {
  try {
    //Crea un nuevo objeto de tarea
    const newTask = {
      title,
      description,
      projectId,
      status,
      priority
    }
    //Crea la tarea en la base de datos
    const createTask = await Task.create(newTask)
    //Retorna un objeto con la respuesta y el resultado de la tarea creada
    return {
      response: 'success',
      result: createTask
    }
  } catch (error) {
    //En caso de error, retorna un objeto con la respuesta de error y el error específico
    return {
      response: 'error',
      error,
      statusCode: 500
    }
  }
}



export const getTasksRepository = async (projectId) => {
  try {
    // Obtener todas las tareas de un proyecto específico
    const tasks = await Task.find({
      projectId
    }).sort({
      updatedAt: -1
    })

    // Si obtuvo resultados en el array
    if (tasks.length > 0) {
      return {
        response: 'success',
        result: tasks
      }
    }

    // No obtuvo resultados
    return {
      response: 'error',
      statusCode: 404,
      msg: new Error('No se encontraron tareas para el proyecto especificado.').message
    }
  } catch (error) {
    return {
      response: 'error',
      error,
      statusCode: 500
    }
  }
}
export const getTaskIdRepository = async ({
  taskId
}) => {
  try {
    //Obtener tarea por ID
    const task = await Task.findById(taskId);
    //Si la tarea existe
    if (task) {
      return {
        response: 'success',
        result: task
      };
    }
    //No se encontró tarea
    return {
      response: 'error',
      statusCode: 404,
      msg: new Error('No se encontró la tarea.').message
    };
  } catch (error) {
    return {
      response: 'error',
      error,
      statusCode: 500
    };
  }
}
export const updateTaskRepository = async (taskId, taskBody) => {
  try {
    // Buscar la tarea por su ID
    let task = await Task.findById(taskId);
    // Si no se encuentra la tarea, devolver error 404
    if (!task) {
      return {
        response: 'error',
        statusCode: 404,
        msg: new Error('No se encontró la tarea.').message
      };
    }
    // Actualizar los campos de la tarea
    task.title = taskBody.title || task.title;
    task.description = taskBody.description || task.description;
    task.status = taskBody.status || task.status;
    task.priority = taskBody.priority || task.priority;
    // Guardar los cambios en la base de datos
    task = await task.save();
    // Devolver la tarea actualizada
    return {
      response: 'success',
      result: task
    };
  } catch (error) {
    // Si ocurre un error, devolverlo
    return {
      response: 'error',
      error,
      statusCode: 500
    };
  }
};

export const deleteTaskRepository = async (taskId) => {
  try {
    // Buscar la tarea por su ID
    let task = await Task.findById(taskId);
    // Si no se encuentra la tarea, devolver error 404
    if (!task) {
      return {
        response: 'error',
        statusCode: 404,
        msg: new Error('No se encontró la tarea.').message
      };
    }
    // Eliminar la tarea de la base de datos
    await Task.deleteOne({
      _id: taskId
    });
    // Devolver la tarea eliminada
    return {
      response: 'success'
    };
  } catch (error) {
    // Si ocurre un error, devolverlo
    return {
      response: 'error',
      error,
      statusCode: 500
    };
  }
};
