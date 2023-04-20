import User from "../../Users/users.model.js";
import { bcryptFunction } from "../../helpers/bcrypt.js";
import { returnError } from "../../helpers/returnError.js";

export const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.params.token });
    if (!user) {
      const error = returnError(400, "El token no es valido.");
      return res.status(error.statusCode).json(error);
    }
    if (!user.active) {
      const error = returnError(404, "La cuenta no esta activa.");
      return res.status(error.statusCode).json(error);
    }
    user.password = await bcryptFunction.GENERATE(req.body.password);
    user.save();
    return res.status(202).json({
      response: "success",
      msg: "Se ha actualizado la contrasena correctamente.",
    });
  } catch (error) {
    return res.status(403).json({ response: "error", msg: error.message });
  }
};
