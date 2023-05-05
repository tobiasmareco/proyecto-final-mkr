import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { conectDatabase } from "./config/conectDatabase.js";
import projectsRoute from "./Projects/projects.routes.js";
import tasksRoutes from "./Tasks/tasks.routes.js";
import usersRoutes from "./Users/users.routes.js";
import authRoutes from "./Auth/auth.routes.js";
import { checkLogin } from "./helpers/checkLogin.js";
import { getUserProfileController } from "./Users/users.controller.js";
import { paymentController } from "./payment/payment.index.js";
const app = express();

//~Conectar a la base de datos.
conectDatabase();

//~Habilitar JSON-EXPRESSS - CORS.
app.use(express.json());
app.use(cors());

//~Rutas de la Aplicacion.
app.use("/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/projects", projectsRoute);
app.use("/api/tasks", tasksRoutes);
app.use("/api/profile", checkLogin, getUserProfileController);
app.use("/api/payment", paymentController);

//~Levantar el servidor.
app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`listening on port ${process.env.API_SERVER_PORT}`);
});
