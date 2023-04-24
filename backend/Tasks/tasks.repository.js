import Task from "./tasks.model.js";

export const taskRepository = {
  CREATE_TASK: async (task) => {
    return await Task.create(task);
  },
  GET_TASKS: async (projectId) => {
    return await Task.find({ projectId });
  },
  GET_TASK_ID: async (taskId) => {
    return await Task.findById(taskId);
  },
  UPDATE_TASK: async ({ ...task }, taskId) => {
    return await Task.findByIdAndUpdate(taskId, task);
  },
  DELETE_TASK: async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
  },
};
