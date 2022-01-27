import express from 'express'
import userRoutes from "./api/userRoutes.js"

const routes = express.Router()

routes.use('/user', userRoutes)

export default routes