import Project from "./projects.model.js";
import User from "../Users/users.model.js";
import { returnError } from "../helpers/returnError.js";
import { projectRepository } from "./index.js";
import Task from "../Tasks/tasks.model.js";

export const createProjectService = async (project, userId) => {
  try {
    const { premium } = await User.findById(userId);
    const projects = (await Project.find({ userId })) || [];
    if (!premium && projects.length >= 2) {
      return {
        error: returnError(
          404,
          "El usuario no posee una cuenta premium, solo es posible crear 2 proyectos."
        ),
      };
    }
    const titleExist = await Project.findOne({ title: project.title, userId });
    if (titleExist) {
      return {
        error: returnError(404, "Ya existe un proyecto con el mismo titulo."),
      };
    }
    const createdProject = await projectRepository.CREATE_PROJECT({
      ...project,
      finishDate: Date.now(),
      userId,
    });
    return { result: createdProject };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};

export const getProjectsService = async (userId) => {
  try {
    const projects = await projectRepository.GET_PROJECTS(userId);
    if (!projects || projects.length < 1) {
      return { error: returnError(404, "No hay proyectos creados.") };
    }
    return { result: projects };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};

export const getProjectIdService = async (projectId) => {
  try {
    const project = await projectRepository.GET_PROJECT_ID(projectId);
    if (!project) {
      return {
        error: returnError(404, `No existe el proyecto con id ${projectId}`),
      };
    }
    return { result: project };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};

export const updateProjectService = async (newProject, projectId, userId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return {
        error: returnError(404, `No existe el proyecto con id ${projectId}`),
      };
    }
    project.title = newProject.title || project.title;
    project.description = newProject.description || project.description;
    project.status = newProject.status || project.status;
    project.finishDate = newProject.finishDate || project.finishDate;
    project.image = newProject.image || "";

    const updateProject = await projectRepository.UPDATE_PROJECT(
      project,
      projectId
    );
    return { result: project };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};

export const deleteProjectService = async (projectId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return {
        error: returnError(404, `No existe el proyecto con id ${projectId}`),
      };
    }
    const deleteProject = await projectRepository.DELETE_PROJECT(projectId);
    const deleteTasks = await Task.deleteMany({ projectId });
    return { result: deleteProject };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};
