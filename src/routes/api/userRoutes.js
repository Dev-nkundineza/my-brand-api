import express from 'express'
import { userController } from '../../controllers/userController.js'

const userControllels = new userController()

const route = express.Router()

route.post('/', userControllels.createProfile)

export default route