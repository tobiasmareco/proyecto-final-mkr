import User from "../../Users/users.model.js";
import { returnError } from "../../helpers/returnError.js";

export const confirmController = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.params.token });
    if (!user) {
      const error = returnError(404, "El token no es valido.");
      return res.status(error.statusCode).json(error);
    }
    user.active = true;
    user.token = "";
    await user.save();
    return res.status(200).json({
      response: "success",
      msg: "La cuenta ha sido confirmada correctamente.",
    });
  } catch (error) {
    return res.status(403).json({ response: "error", msg: error.message });
  }
};
