import { UserServices } from "../services/userServices.js"
import bcrypt from "bcryptjs"
export class userController {
    async createProfile(req, res, next) {


        const hashed = await bcrypt.hash(req.body.password, 12)

        const data = {
            username: req.body.username,
            password: hashed,
        };
        const saveUser = await new UserServices().createUser(data);
        res.status(200).json({
            status: 200,
            message: "user created successfully",
            data: saveUser,
        });
    }

    async _getAllUsers(req, res, next) {
        try {
            const allUsers = await new UserServices().getUser();
            res
                .status(200)
                .json({ status: 200, message: "you get all users", data: allUsers });
        } catch (error) {
            console.log(error);
        }
    }

    // GET SINGLE USER

    async _getOneUsers(req, res, next) {
        try {
            const user = await new UserServices().getOneUser(req.params.id);
            res
                .status(200)
                .json({ status: 200, message: "selected user", data: user });
        } catch (error) {
            console.log(error);
        }
    }

    // update an user

    async _updateUser(req, res, next) {
        try {
            const user = await new UserServices().updateProfile(req.params.id);
            if (req.body.username) {
                user.username = req.body.username;
            }
            if (req.body.password) {
                user.password = req.body.password;
            }

            res.status(200).json({
                status: 200,
                message: "profile has been updated",
                data: user,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // DELETE USER

    async _deleteUser(req, res, next) {

        await new UserServices().deleteUser(req.params.id)
        res.status(200).json({
            status: 200,
            message: `user ${req.params.id} has been deleted`,
        })

    }
}