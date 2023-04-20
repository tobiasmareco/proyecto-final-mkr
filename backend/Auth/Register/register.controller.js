import { registerService } from "./register.services.js";

export const registerController = async (req, res) => {
  const { result, error } = await registerService(req.body);
  if (error) {
    return res.status(error.statusCode).json(error);
  }
  return res.status(201).json(result);
};
