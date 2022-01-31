import express from 'express'
import queriesRoutes from "./api/queriesRoutes.js"



const routes = express.Router()
routes.use('/', welcomeRoutes)
routes.use('/articles', articleRoutes)

routes.use('/queries', queriesRoutes)


export default routes