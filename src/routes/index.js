import express from 'express'
import welcomeRoutes from "./api/welcomeRoutes.js"
import articleRoutes from "./api/articleRoutes.js"


const routes = express.Router()

routes.use('/', welcomeRoutes)
routes.use('/articles', articleRoutes)


export default routes