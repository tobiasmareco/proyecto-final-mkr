import { returnError } from "../helpers/returnError.js";
import { Send } from "../helpers/sendMail.js";
import User from "./users.model.js";
import { userRepository } from "./users.repository.js";

export const createUserService = async (user) => {
  try {
    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return { error: returnError(404, `Ya existe el email registrado.`) };
    }
    const userCreated = await userRepository.CREATE_USER(user);
    await Send(
      email,
      "Confirm Account",
      emailMessages.REGISTER_MESSAGE(
        email,
        `http://localhost:${process.env.API_SERVER_PORT}/auth/confirm-account/${userCreated.token}`
      )
    );
    return { result: userCreated };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};

export const getUsersService = async () => {
  try {
    const user = await userRepository.GET_USERS();
    if (!user) {
      return { error: returnError(404, `No existen usuarios.`) };
    }
    return { result: user };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};

export const getUserIdService = async (userId) => {
  try {
    const userExist = await User.findById(userId);
    if (!userExist) {
      return {
        error: returnError(404, `No existe el usuario con id ${userId}.`),
      };
    }
    const user = await userRepository.GET_USER_ID(userId);
    return { result: user };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};

export const updateUserService = async (newUser, userId) => {
  try {
    const userExist = await User.findById(userId);
    if (!userExist) {
      return {
        error: returnError(404, `No existe el usuario con id ${userId}.`),
      };
    }
    userExist.name = newUser.name || userExist.name;
    userExist.password = newUser.password || userExist.password;
    userExist.premium = newUser.premium ? true : false;
    userExist.active = newUser.active ? true : false;
    userExist.admin = newUser.admin ? true : false;
    await userRepository.UPDATE_USER(userExist, userId);
    return { result: userExist };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};

export const deleteUserService = async (userId) => {
  try {
    const userExist = await User.findById(userId);
    if (!userExist) {
      return {
        error: returnError(404, `No existe el usuario con id ${userId}.`),
      };
    }
    const deletedUser = await userRepository.DELETE_USER(userId);
    return { result: deletedUser };
  } catch (error) {
    return { error: returnError(403, error.message) };
  }
};
