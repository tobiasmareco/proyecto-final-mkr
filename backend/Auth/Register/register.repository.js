import User from "../../Users/users.model.js";
import { bcryptFunction } from "../../helpers/bcrypt.js";
import { Token } from "../../helpers/generateToken.js";
import { returnError } from "../../helpers/returnError.js";
import { Send, emailMessages } from "../../helpers/sendMail.js";

export const registerRepository = async ({ name, email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    return returnError(409, "El email ya esta registrado.");
  }

  try {
    const newUser = await User.create({ name, email, password });
    newUser.token = Token.GENERATE();
    newUser.password = await bcryptFunction.GENERATE(password);
    await newUser.save();
    //! ENVIAR EMAIL DE CUENTA CREADA PARA CONFIRMAR.
    await Send(
      email,
      "Confirm Account",
      emailMessages.REGISTER_MESSAGE(
        email,
        `http://localhost:${process.env.API_SERVER_PORT}/auth/confirm-account/${newUser.token}`
      )
    );
    return {
      response: "success",
      result: newUser,
      msg: "Se ha registrado el usuario, verifique su email para confirmar la cuenta.",
    };
  } catch (error) {
    return returnError(403, error.message);
  }
};
