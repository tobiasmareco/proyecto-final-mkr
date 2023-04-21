import express from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectIdController,
  getProjectsController,
  updateProjectController,
} from "../Projects/index.js";
import {
  validatorCreateProject,
  validatorUpdateProject,
} from "./projects.validator.js";
import { checkLogin } from "../helpers/checkLogin.js";

const projectsRoute = express.Router();

projectsRoute.get("/", checkLogin, getProjectsController);
projectsRoute.get("/:id", checkLogin, getProjectIdController);
projectsRoute.post(
  "/",
  checkLogin,
  validatorCreateProject,
  createProjectController
);
projectsRoute.put(
  "/:id",
  checkLogin,
  validatorUpdateProject,
  updateProjectController
);
projectsRoute.delete("/:id", checkLogin, deleteProjectController);

export default projectsRoute;
