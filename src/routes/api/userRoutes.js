import express from 'express'
import multer from 'multer'
import { fileFilter } from '../../../helpers/fileFilter.js'
import { userValidation } from "../../validations/userValidation/userValidation.js"
import { authenticate } from "../../middlewares/authanticate.js";
import { userController } from '../../controllers/userController.js'

const userControllels = new userController()
const authatication = await new authenticate().auth;
const storage = multer.diskStorage({});
const uploads = multer({ storage, fileFilter })
const route = express.Router()

route.post('/register', authatication, uploads.single('picture'), userValidation, userControllels.createProfile)
route.post('/login', userControllels.login)
route.patch('/edit/:id', userControllels.updateProfile)


export default route