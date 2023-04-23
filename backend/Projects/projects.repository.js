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

export const getProjectIdRepository = async ({ projectId }, userId) => {
  try {
    const project = await Project.findOne({
      _id: projectId,
      userId,
    });
    if (project.length > 0) {
      return { response: "success", result: project };
    }
    return {
      response: "error",
      statusCode: 404,
      msg: new Error("No se encontro proyecto.").message,
    };
  } catch (error) {
    return {
      response: "error",
      error,
      statusCode: 500,
    };
  }
};

export const updateProjectRepository = async (
  { projectId, projectBody },
  userId
) => {
  try {
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return { response: "error", msg: "El proyecto no existe" };
    }
    const { title, description, image, finishDate, status } = projectBody;
    project.title = title ? title : project.title;
    project.description = description ? description : project.description;
    project.image = image ? image : project.image;
    project.finishDate = finishDate
      ? finishDate
      : project.finishDate.toDateString();
    project.status = status ? status : project.status;

    await project.save();
    return {
      response: "success",
      msg: "Se ha actualizado el proyecto correctamente.",
      project,
    };
  } catch (error) {
    return {
      response: "error",
      msg: error.message,
      statusCode: 500,
    };
  }
};

export const deleteProjectRepository = async ({ projectId }, userId) => {
  try {
    let project = await Project.find({
      _id: projectId,
      userId,
    });
    //Si obtuvo resultados en el array
    if (project.length > 0) {
      await Project.findOneAndDelete({ _id: projectId });
      return { response: "success" };
    }
    return {
      response: "error",
      statusCode: 404,
      msg: new Error("No se encontro proyecto.").message,
    };
  } catch (error) {
    return {
      response: "error",
      error,
      statusCode: 500,
    };
  }
};
