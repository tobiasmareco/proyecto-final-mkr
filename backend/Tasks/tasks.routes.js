import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getTaskIdController,
  getTasksController,
  updateTaskController,
} from "../Tasks/index.js";
import { validatorCreateTask } from "./tasks.validator.js";
import { checkLogin } from "../helpers/checkLogin.js";
const tasksRoutes = express.Router();

tasksRoutes.get("/:projectId", checkLogin, getTasksController);
tasksRoutes.get("/:id", checkLogin, getTaskIdController);
tasksRoutes.post("/", checkLogin, validatorCreateTask, createTaskController);
tasksRoutes.put("/:id", checkLogin, updateTaskController);
tasksRoutes.delete("/:id", checkLogin, deleteTaskController);

export default tasksRoutes;
