import User from "../../Users/users.model.js";
import { bcryptFunction } from "../../helpers/bcrypt.js";
import { JWT } from "../../helpers/generateToken.js";
import { returnError } from "../../helpers/returnError.js";

export const loginRepository = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return returnError(400, "El email no esta registrado.");
    }
    if (!(await bcryptFunction.COMPARE(password, user.password))) {
      return returnError(404, "Usuario o contraseña incorrecta.");
    }
    if (!user.active) {
      return returnError(
        400,
        "La cuenta no esta activa , verifique su email para confirmar la cuenta."
      );
    }
    return {
      response: "success",
      user,
      tokenSession: JWT.GENERATE(user._id, process.env.API_JWT_SECRET),
    };
  } catch (error) {
    console.log(error)
    return returnError(403, error.message);
  }
};
