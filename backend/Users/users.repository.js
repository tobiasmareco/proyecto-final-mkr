import { bcryptFunction } from "../helpers/bcrypt.js";
import { Token } from "../helpers/generateToken.js";
import User from "./users.model.js";

export const userRepository = {
  CREATE_USER: async (user) => {
    user.password = await bcryptFunction.GENERATE(user.password);
    user.token = Token.GENERATE();
    return await User.create(user);
  },
  GET_USERS: async () => {
    return await User.find({});
  },
  GET_USER_ID: async (userId) => {
    return await User.findById(userId);
  },
  UPDATE_USER: async (user, userId) => {
    user.password = await bcryptFunction.GENERATE(user.password);
    return await User.findByIdAndUpdate(userId, user);
  },
  DELETE_USER: async (userId) => {
    return await User.findByIdAndDelete(userId);
  },
};
