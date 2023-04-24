import {
  createTaskService,
  getTasksService,
  getTaskIdService,
  updateTaskService,
  deleteTaskService,
} from "./index.js";

export const createTaskController = async (req, res) => {
  // Definimos el controlador createTaskController
  const { result, error } = await createTaskService(req.body, req.user); // Llamamos a la función createTaskService para crear una nueva tarea en la base de datos
  if (error) {
    // Si se produjo un error durante la creación de la tarea
    return res // Enviamos una respuesta al cliente con el código de estado y el mensaje de error correspondiente
      .status(error.statusCode)
      .json({
        response: error.response,
        msg: error.msg,
      });
  }
  return res // Si la creación de la tarea fue exitosa, enviamos una respuesta
    .status(201)
    .json({
      response: "success",
      msg: "Tarea creada correctamente",
      result,
    });
};

export const getTasksController = async (req, res) => {
  const { result, error } = await getTasksService(req.params.projectId);
  //Llamamos a la función getTasksService() para obtener todas las tareas existentes en el sistema
  if (error) {
    //Si existe un error, se devuelve un mensaje de error con el código de estado correspondiente.
    return res.status(error.statusCode).json({
      response: error.response,
      msg: error.msg,
    });
  }
  //Si todo está bien, se devuelve un mensaje de éxito con el código de estado correspondiente y las tareas obtenidas.
  return res.status(200).json({
    response: "success",
    msg: "Tareas encontradas satisfactoriamente",
    result,
  });
};

export const getTaskIdController = async (req, res) => {
  //Obtenemos el ID de la tarea
  const taskId = req.params.id;

  //Llamamos a la función getTaskIdService
  const { result, error } = await getTaskIdService(taskId);

  //Si se produce un error al buscar la tarea, enviamos una respuesta
  if (error) {
    return res.status(error.statusCode).json({
      response: error.response,
      msg: error.msg,
    });
  }

  //Si la búsqueda se realizó con éxito, enviamos una respuesta
  return res.status(200).json({
    response: "success",
    msg: "Tarea encontrada satisfactoriamente",
    result,
  });
};

export const updateTaskController = async (req, res) => {
  // Se llama a la función updateTaskService
  const { result, error } = await updateTaskService(req.body, req.params.id);
  // Si ocurre un error en la función updateTaskService se responde con un mensaje de error
  if (error) {
    return res.status(error.statusCode).json({
      response: error.response,
      msg: error.msg,
      result,
    });
  }
  // Si todo va bien, se responde con un mensaje de éxito
  return res.status(200).json({
    response: "success",
    msg: "Tarea actualizada satisfactoriamente",
    result,
  });
};

export const deleteTaskController = async (req, res) => {
  const taskId = req.params.id; // Obtiene el id de la tarea a eliminar
  const { result, error } = await deleteTaskService(taskId); // Llama a la función deleteTaskService

  if (error) {
    // Si hay un error en el servicio, envía una respuesta con el mensaje de error y el resultado obtenido
    return res.status(error.statusCode).json({
      response: error.response,
      msg: error.msg,
      result,
    });
  }

  // Si la eliminación fue exitosa, envía una respuesta con el mensaje de éxito y el resultado obtenido
  return res.status(200).json({
    response: "success",
    msg: "Tarea eliminada satisfactoriamente",
    result,
  });
};
