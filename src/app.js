import express from "express";
import mongoose from "mongoose";
import fs from 'fs'
import cors from 'cors'
import morgan from 'morgan'
import swaggerJsdoc from 'swagger-jsdoc'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import routes from "./routes/index.js";
import swaggerDoc from '../swagger.json'
import "dotenv/config";




const app = express();

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || "development";

try {
    if (mode === "development") {
        mongoose.connect(process.env.DEVELOPMENT_DB, {
            useNewUrlParser: true,
        }).then((res) => { console.log("DEV DB CONNECTED"); });
    } else if (mode === "test") {
        mongoose.connect(process.env.TEST_DB, { useNewUrlParser: true }).then((res) => { console.log("TEST DB CONNECTED"); });
    } else if (mode === "production") {
        mongoose.connect(process.env.PRODUCTION_DB, {
            useNewUrlParser: true,
        }).then((res) => { console.log("PROD DB CONNECTED"); });
    }
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"))
    app.use("/api/v1/", routes);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }))

    app.get("/", (req, res) => {
        res.json({ message: "WELCOME TO MY API" })
    })
    app.use("*", (req, res, next) => {
        res.status(404).json({
            error: "NOT FOUND"
        })
    })

    app.listen(port, () => {
        console.log(`App Connected to port ,running............ `);
    });
} catch (error) {
    console.log(error);
}

export default app;