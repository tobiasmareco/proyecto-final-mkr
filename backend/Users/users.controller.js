import { returnError } from "../helpers/returnError.js";
import {
  createUserService,
  deleteUserService,
  getUserIdService,
  getUsersService,
  updateUserService,
} from "./index.js";
import User from "./users.model.js";

export const createUserController = async (req, res) => {
  const { result, error } = await createUserService(req.body);
  if (error) {
    return res
      .status(error.statusCode)
      .json({ response: error.response, msg: error.msg });
  }
  return res.status(201).json({
    response: "success",
    msg: "Usuario creado correctamente, verifique su correo para activar la cuenta.",
    result,
  });
};

export const getUsersController = async (req, res) => {
  const { result, error } = await getUsersService();
  if (error) {
    return res.status(error.statusCode).json({
      response: error.response,
      msg: error.msg,
    });
  }
  return res.status(200).json({
    response: "success",
    msg: "Se han obtenido los usuarios.",
    result,
  });
};

export const getUserIdController = async (req, res) => {
  const { result, error } = await getUserIdService(req.params.id);
  if (error) {
    return res.status(error.statusCode).json({
      response: error.response,
      msg: error.msg,
    });
  }
  return res.status(200).json({
    response: "success",
    msg: "Se ha obtenido el usuario.",
    result,
  });
};

export const updateUserController = async (req, res) => {
  const { result, error } = await updateUserService(req.body, req.params.id);
  if (error) {
    return res.status(error.statusCode).json({
      response: error.response,
      msg: error.msg,
    });
  }
  return res.status(200).json({
    response: "success",
    msg: "Se han actualizado los datos del usuario.",
    result,
  });
};

export const deleteUserController = async (req, res) => {
  const { result, error } = await deleteUserService(req.params.id);
  if (error) {
    return res.status(error.statusCode).json({
      response: error.response,
      msg: error.msg,
    });
  }
  return res.status(200).json({
    response: "success",
    msg: "Se ha eliminado el usuario.",
    result,
  });
};

//USER PROFILE
export const getUserProfileController = async (req, res) => {
  const { user } = req;
  const {_id,email,name} = await User.findById(user)
  if(!_id){
    return returnError(404,`No existe usuario con id ${user}`)
  }
  return res.status(200).json({response:'success',result:{_id,email,name}})
};
