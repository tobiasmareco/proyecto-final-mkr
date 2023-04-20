import express from "express";
import { loginController } from "./Login/login.controller.js";
import { validateLogin } from "./Login/login.validator.js";
import { registerController } from "./Register/register.controller.js";
import { validateRegister } from "./Register/register.validator.js";
const authRoutes = express.Router();

authRoutes.post("/", validateLogin, loginController);
authRoutes.post("/register", validateRegister, registerController);

export default authRoutes;
