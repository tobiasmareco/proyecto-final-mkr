import User from "../../Users/users.model.js";
import { Token } from "../../helpers/generateToken.js";
import { returnError } from "../../helpers/returnError.js";

export const forgotController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = returnError(400, "El email no existe en el sistema.");
      return res.status(error.statusCode).json(error);
    }
    if (!user.active) {
      const error = returnError(400, "La cuenta del usuario no esta activa.");
      return res.status(error.statusCode).json(error);
    }
    user.token = Token.GENERATE();
    await user.save();

    //!ENVIAR EMAIL AQUI PARA REESTABLECER CONTRASENA.
    return res.status(200).json({
      reponse: "success",
      msg: "Se ha enviado un email con las instrucciones para reestablecer la contrasena.",
    });
  } catch (error) {
    return res.status(403).json({ response: "error", msg: error.message });
  }
};
