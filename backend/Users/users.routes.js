import express from "express";
import {
  createUserController,
  deleteUserController,
  getUserIdController,
  getUsersController,
  updateUserController,
} from "../Users/index.js";
import { validateCreateUser } from "./users.validator.js";
import { checkLogin } from "../helpers/checkLogin.js";
const usersRoutes = express.Router();

usersRoutes.get("/", checkLogin, getUsersController);
usersRoutes.get("/:id", checkLogin, getUserIdController);
usersRoutes.post("/", checkLogin, validateCreateUser, createUserController);
usersRoutes.put("/:id", checkLogin, updateUserController);
usersRoutes.delete("/:id", checkLogin, deleteUserController);
export default usersRoutes;
