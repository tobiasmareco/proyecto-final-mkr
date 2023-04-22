import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getTaskIdController,
  getTasksController,
  updateTaskController,
} from "../Tasks/index.js";
import { validatorCreateTask } from "./tasks.validator.js";
const tasksRoutes = express.Router();

tasksRoutes.get("/", getTasksController);
tasksRoutes.get("/:id", getTaskIdController);
tasksRoutes.post("/", validatorCreateTask, createTaskController);
tasksRoutes.put("/:id", updateTaskController);
tasksRoutes.delete("/:id", deleteTaskController);

export default tasksRoutes;
