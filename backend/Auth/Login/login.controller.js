import { loginService } from "./login.services.js";
export const loginController = async (req, res) => {
  const { result, error } = await loginService(req.body);
  if (error) {
    return res.status(error.statusCode).json(error);
  }
  return res.status(200).json(result);
};
