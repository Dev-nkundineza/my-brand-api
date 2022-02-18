import express from "express";
import { CommentsController } from "../../controllers/commentsController.js";
import { commentValidation } from "../../validations/commentValidation/commentValidation.js"
const route = express.Router();

const commentControllers = new CommentsController();


route.get("/:articleId", commentControllers.getComments);
route.post("/:articleId", commentValidation, commentControllers.addComment);
route.delete("/:id", commentControllers.deleteComment);

export default route;