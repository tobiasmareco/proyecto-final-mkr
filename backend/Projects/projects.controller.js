import {
  createProjectService,
  deleteProjectService,
  getProjectIdService,
  getProjectsService,
  updateProjectService,
} from "./index.js";

export const createProjectController = async (req, res) => {
  const { result, error } = await createProjectService(req.body, req.user);
  if (error) {
    return res
      .status(error.statusCode)
      .json({ response: error.response, msg: error.msg });
  }
  return res.status(201).json({
    response: "success",
    msg: "Proyecto creado correctamente",
    result,
  });
};

export const getProjectsController = async (req, res) => {
  const { result, error } = await getProjectsService(req.user);
  if (error) {
    return res
      .status(error.statusCode)
      .json({ response: "error", msg: error.msg });
  }
  return res.status(200).json({
    response: "success",
    msg: "Proyectos encontrados satisfactoriamente",
    result,
  });
};

export const getProjectIdController = async (req, res) => {
  const { result, error } = await getProjectIdService(req.params.id, req.user);
  if (error) {
    return res
      .status(error.statusCode)
      .json({ response: error.response, msg: error.msg });
  }
  return res.status(200).json({
    response: "success",
    msg: "Proyecto  encontrado satisfactoriamente",
    result,
  });
};

export const updateProjectController = async (req, res) => {
  const { result, error } = await updateProjectService(
    req.body,
    req.params.id,
    req.user
  );
  if (error) {
    return res
      .status(error.statusCode)
      .json({ response: error.response, msg: error.msg });
  }
  return res.status(200).json({
    response: "success",
    msg: "Proyecto  actualizado satisfactoriamente",
    result,
  });
};

export const deleteProjectController = async (req, res) => {
  const { result, error } = await deleteProjectService(req.params.id, req.user);
  if (error) {
    return res
      .status(error.statusCode)
      .json({ response: error.response, msg: error.msg, result });
  }
  return res.status(200).json({
    response: "success",
    msg: "Proyecto  eliminado satisfactoriamente",
    result,
  });
};
