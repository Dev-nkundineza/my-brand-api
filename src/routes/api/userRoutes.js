import express from 'express'
import { userController } from '../../controllers/userController.js'

const userControllels = new userController()

const route = express.Router()

route.post('/', userControllels.createProfile)
route.get('/', userControllels._getAllUsers)
route.get('/:id', userControllels._getOneUsers)
route.patch('/:id', userControllels._updateUser)
route.delete('/:id', userControllels._deleteUser)

export default route