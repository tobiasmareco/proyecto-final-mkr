import User from "../Users/users.model.js";
import Project from "./projects.model.js";

export const createProjectsRepository = async (
  { title, description, finishDate, image },
  userId
) => {
  // let userIsPremium = false;
  // try {
  //   //Reemplazar por user loggeado
  //   const user = await User.findOne({ _id: userId });
  //   userIsPremium = user.premium;
  //   const projects = (await Project.find({ userId })) || [];
  //   if (!userIsPremium && projects.length >= 2) {
  //     return {
  //       response: "error",
  //       statusCode: 404,
  //       msg: "El usuario no posee una cuenta premium. Solo es valido para 2 proyectos. ",
  //     };
  //   }
  //   const project = await Project.findOne({ title, userId: userId });
  //   //project title ya existe = true
  //   if (project) {
  //     return {
  //       response: "error",
  //       statusCode: 404,
  //       msg: new Error("El proyecto ya se encuentra creado.").message,
  //     };
  //   }
  //   const newProject = {
  //     title,
  //     description,
  //     userId: userId,
  //     finishDate,
  //     image,
  //   };
  //   //Crea nuevo proyecto
  // try{
    // const createProject = await Project.create(newProject);
    // return { response: "success", result: createProject };
    return await Project.create(newProject)
  // } catch (error) {
  //   // console.log(error);
  //   // return { response: "error", error, statusCode: 500 };
  //   return error
  // }
};

export const getUserId = (id)=>{
  return {_id : '1'}
}

export const getProjectsRepository = async (userId) => {
  console.log(userId)
  try {
    const project = await Project.find({
      userId,
    }).sort({ updatedAt: -1 });
    if (project.length > 0) {
      return { response: "success", result: project };
    }
    //No obtuvo resultados
    return {
      response: "error",
      statusCode: 404,
      msg: new Error("No se encontraron proyectos creados.").message,
    };
  } catch (error) {
    return { response: "error", error, statusCode: 500 };
  }
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
