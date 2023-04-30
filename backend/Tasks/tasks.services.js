import Project from "../Projects/projects.model.js";
import User from "../Users/users.model.js";
import { returnError } from "../helpers/returnError.js";
import { taskRepository } from "./index.js";
import Task from "./tasks.model.js";

export const createTaskService = async (newTask, userId) => {
  try {
    console.log(userId);
    const { premium } = await User.findById(userId);
    const projectExist = await Project.findById(newTask.projectId);
    if (!projectExist) {
      return {
        error: returnError(
          404,
          `No existe el proyecto con id ${newTask.projectId}.`
        ),
      };
    }
    const tasks = (await Task.find({ projectId: newTask.projectId })) || [];
    if (!premium && tasks.length >= 4) {
      return {
        error: returnError(
          404,
          "El usuario no posee cuenta premium, solo es posible tener 4 tareas."
        ),
      };
    }
    const task = await taskRepository.CREATE_TASK(newTask);
    return { result: task };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};

export const getTasksService = async (projectId) => {
  try {
    const projectExist = await Project.findById(projectId);
    if (!projectExist) {
      return {
        error: returnError(404, `No existe el proyecto con id ${projectId}.`),
      };
    }
    const tasks = await taskRepository.GET_TASKS(projectId);
    if (!tasks || tasks.length < 1) {
      return { error: returnError(404, "El Proyecto no tiene tareas.") };
    }
    return { result: tasks };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};
export const getTaskIdService = async (taskId) => {
  console.log("entre", taskId);
  try {
    const task = await taskRepository.GET_TASK_ID(taskId);
    if (!task) {
      return {
        error: returnError(
          404,
          `No se ha encontrado la tarea con id ${taskId}`
        ),
      };
    }
    return { result: task };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};

export const updateTaskService = async (newTask, taskId) => {
  try {
    const task = await Task.findById(taskId);
    console.log(task);
    if (!task) {
      return { error: returnError(404, `No existe tarea con el id ${taskId}`) };
    }
    task.title = newTask.title || task.title;
    task.description = newTask.description || task.description;
    task.status = newTask.status || task.status;
    task.priority = newTask.priority || task.priority;
    const updatedTask = await taskRepository.UPDATE_TASK(task, taskId);
    return { result: task };
  } catch (error) {
    console.log(error);
    return { error: returnError(403, error.message) };
  }
};

export const deleteTaskService = async (taskId) => {
  try {
    const task = await Task.findById(taskId);
    console.log(task);
    if (!task) {
      return { error: returnError(404, `No existe tarea con el id ${taskId}`) };
    }
    const deletedTask = await taskRepository.DELETE_TASK(taskId);
    return { result: deletedTask };
  } catch (error) {
    console.log(error);
    return { error: returnError(403, error.message) };
  }
};