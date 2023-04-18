import User from "../../Users/users.model.js";
import { returnError } from "../../helpers/returnError.js";

export const loginRepository = async (email, password) => {
  const user = await User.findOne({ email })
  console.log(user)
  if (!user) {
    return returnError('error', 400, 'El email no esta registrado.')
  }
}