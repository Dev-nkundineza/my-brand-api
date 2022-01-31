import express from "express";
import { QueryController } from "../../controllers/queriesController.js";
import { queryValidation } from "../../validations/queriesValidation/queriesValidation.js"

const route = express.Router();

const queryConstructor = new QueryController();

route.post("/", queryValidation, queryConstructor.sendQuery);
route.get("/", queryConstructor.getAllQueries);
route.delete("/:id", queryConstructor.deleteQuery);

export default route;