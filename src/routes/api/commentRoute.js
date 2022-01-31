import express from "express";
import { CommentsController } from "../../controllers/commentsController.js";
const route = express.Router();

const commentControllers = new CommentsController();

route.get("/:articleId", commentControllers.getComments);
route.post("/:articleId", commentControllers.addComment);
route.delete("/:id", commentControllers.deleteComment);

export default route;