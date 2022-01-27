import { UserServices } from "../services/userServices.js"
export class userController {

    async createProfile(req, res, next) {

        const data = {
            "username": req.body.username,
            "password": req.body.password
        }
        const saveUser = await new UserServices().createUser(data)
        res.status(200).json({ status: 200, message: "user created successfully", data: saveUser })
    }
}