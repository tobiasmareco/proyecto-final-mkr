import User from "../Users/users.model.js";
import {
  createProjectsRepository,
  deleteProjectRepository,
  getProjectIdRepository,
  getProjectsRepository,
  getUserId,
  updateProjectRepository,
} from "./index.js";
import Project from "./projects.model.js";

export const createProjectService = async (project, userId) => {
  let userIsPremium = false;
  try {
    //Reemplazar por user loggeado
    // const user = await User.findOne({ _id: userId });
    const user = await getUserIdService(userId) // si exiiste retorna el usuario. || null
    userIsPremium = user.premium;
    // const projects = (await Project.find({ userId })) || [];
    const projects = await getProjectService(userId);
    if (!userIsPremium && projects.length >= 2) {
      return {
        response: "error",
        statusCode: 404,
        msg: "El usuario no posee una cuenta premium. Solo es valido para 2 proyectos. ",
      };
    }
    // const project = await Project.findOne({ title, userId: userId });
    const project = await getProjectById(idProject , userId);

    //project title ya existe = true
    if (project) {
      return {
        response: "error",
        statusCode: 404,
        msg: new Error("El proyecto ya se encuentra creado.").message,
      };
    }
    const newProject = {
      title,
      description,
      userId: userId,
      finishDate,
      image,
    };
    //Crea nuevo proyecto
    // const createProject = await Project.create(newProject);
    const projectCreated= await createProjectsRepository(newProject);


    return {response:'success'}
    // return { response: "success", result: createProject };
    
  } catch (error) {
    console.log(error);
    return { response: "error", error, statusCode: 500 };
  }
  const response = await createProjectsRepository({ ...project }, userId);
  if (response.response === "error") {
    return { error: response };
  }
  return { result: response.result };
};

export const getProjectsService = async (userId) => {
  const response = await getProjectsRepository(userId);
  if (response.response === "error") {
    return { error: response };
  }
  return { result: response.result };
};

export const getProjectIdService = async (project, userId) => {
  const response = await getProjectIdRepository(
    { ...project, projectId: project },
    userId
  );
  if (response.response === "error") {
    return { error: response };
  }
  return { result: response.result };
};

export const updateProjectService = async (project, userId) => {
  const response = await updateProjectRepository(
    { ...project, projectId: project.params.id, projectBody: project.body },
    userId
  );
  if (response.response === "error") {
    return { error: response };
  }
  return { result: response.project };
};


export const deleteProjectService = async (project, userId) => {
  const response = await deleteProjectRepository(
    { ...project, projectId: project },
    userId
  );
  if (response.response === "error") {
    return { error: response };
  }
  return { result: response.result };
};
