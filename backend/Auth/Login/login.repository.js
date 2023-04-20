import User from "../../Users/users.model.js";
import { bcryptFunction } from "../../helpers/bcrypt.js";
import { JWT } from "../../helpers/generateToken.js";
import { returnError } from "../../helpers/returnError.js";

export const loginRepository = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return returnError("error", 400, "El email no esta registrado.");
  }
  if (!(await bcryptFunction.COMPARE(password, user.password))) {
    return returnError("error", 404, "Usuario o contraseña incorrecta.");
  }
  return {
    response: "success",
    user,
    tokenSession: JWT.GENERATE(user._id, process.env.API_JWT_SECRET),
  };
};
