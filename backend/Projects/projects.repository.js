import User from "../Users/users.model.js";
import Project from "./projects.model.js";

export const projectRepository = {
  CREATE_PROJECT: async (newProject) => {
    return await Project.create(newProject);
  },
  GET_PROJECTS: async (userId) => {
    return await Project.find({ userId }).sort({ createdAt: -1 });
  },
  GET_PROJECT_ID: async (projectId) => {
    return await Project.findById(projectId);
  },
  DELETE_PROJECT: async (projectId) => {
    return await Project.findByIdAndDelete(projectId);
  },
  UPDATE_PROJECT: async (updatedProject, projectId) => {
    return await Project.findByIdAndUpdate(projectId, updatedProject);
  },
};
