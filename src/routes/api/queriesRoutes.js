import express from "express";
import { QueryController } from "../../controllers/queriesController.js";
import { queryValidation } from "../../validations/queriesValidation/queriesValidation.js"
import { authenticate } from "../../middlewares/authanticate.js";

const authatication = await new authenticate().auth;

const route = express.Router();

const queryConstructor = new QueryController();

route.post("/", queryValidation, queryConstructor.sendQuery);
route.get("/", authatication, queryConstructor.getAllQueries);
route.delete("/:id", authatication, queryConstructor.deleteQuery);

export default route;