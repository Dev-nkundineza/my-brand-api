import express from "express";
import multer from "multer";
import { ArticleController } from "../../controllers/articleController.js";

const route = express.Router();
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("invalid image file!", false);
    }
};
const uploads = multer({ storage, fileFilter });
const articleControllers = new ArticleController();

route.post("/", uploads.single("image"), articleControllers.createArticle);
route.get("/", articleControllers.getAllArticles);
route.get("/:id", articleControllers.getArticle);
route.patch("/:id", uploads.single("image"), articleControllers.updateArticle);
route.delete("/:id", articleControllers.deleteArticle);

// create Article

export default route;