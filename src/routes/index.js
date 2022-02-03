import express from "express";
import userRoutes from "./api/userRoutes.js";
import welcomeRoutes from "./api/welcomeRoutes.js";
import articleRoutes from "./api/articleRoutes.js";
import queriesRoutes from "./api/queriesRoutes.js";
import commentRoutes from "./api/commentRoute.js"

const routes = express.Router();
routes.use("/", welcomeRoutes);
routes.use("/articles", articleRoutes);
routes.use("/queries", queriesRoutes);
routes.use("/user", userRoutes);
routes.use("/comment", commentRoutes);



export default routes;