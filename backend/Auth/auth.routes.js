import express from "express";

import { loginController } from "./Login/login.controller.js";
import { validateLogin } from "./Login/login.validator.js";
import { registerController } from "./Register/register.controller.js";
import { validateRegister } from "./Register/register.validator.js";
import { validateForgot } from "./ForgotPassword/forgot.validate.js";
import { forgotController } from "./ForgotPassword/forgot.controller.js";
import { validateReset } from "./ResetPassword/reset.validator.js";
import { resetPassword } from "./ResetPassword/reset.controller.js";
import { confirmController } from "./confirmAccount/confirm.controller.js";
const authRoutes = express.Router();

authRoutes.post("/", validateLogin, loginController);
authRoutes.post("/register", validateRegister, registerController);
authRoutes.post("/forgot-password", validateForgot, forgotController);
authRoutes.post("/reset-password/:token", validateReset, resetPassword);
authRoutes.get("/confirm-account/:token", confirmController);

export default authRoutes;
