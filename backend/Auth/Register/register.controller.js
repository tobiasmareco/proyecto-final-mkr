import { registerService } from "./register.services.js"

export const registerController = async (req, res) => {
  await registerService(req.body)
}