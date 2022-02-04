import express from "express";
import multer from "multer";
import { ArticleController } from "../../controllers/articleController.js";
import { authenticate } from "../../middlewares/authanticate.js";
import { articleValidation } from "../../validations/articleValidation/articleValidation.js";

const authatication = new authenticate().auth;

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

route.post(
    "/",
    authatication,
    uploads.single("image"),
    articleValidation,
    articleControllers.createArticle
);
route.get("/", articleControllers.getAllArticles);
route.get("/:id", articleControllers.getArticle);
route.patch(
    "/:id",
    authatication,
    uploads.single("image"),
    articleValidation,
    articleControllers.updateArticle
);
route.delete("/:id", authatication, articleControllers.deleteArticle);

// create Article

export default route;