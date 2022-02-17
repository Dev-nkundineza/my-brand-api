import express from "express";
import multer from "multer";
import { fileFilter } from "../../helpers/fileFilter.js";
import { authenticate } from "../../middlewares/authanticate.js";
import { userValidation } from "../../validations/userValidation/userValidation.js";

import { userController } from "../../controllers/userController.js";

const userControllels = new userController();
const authatication = new authenticate().auth;

const storage = multer.diskStorage({});
const uploads = multer({ storage, fileFilter });
const route = express.Router();

route.post(
    "/register",
    uploads.single("picture"),
    userValidation,
    userControllels.createProfile
);
route.post("/login", userControllels.login);
route.get("", authatication, userControllels.getAlluser);
route.get("/:id", authatication, userControllels.getOneUser);
route.delete("/:id", authatication, userControllels.deleteUser);
route.patch("/:id", authatication, uploads.single("picture"), userControllels.updateProfile);

export default route;