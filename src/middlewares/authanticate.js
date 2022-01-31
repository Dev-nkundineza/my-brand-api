import 'dotenv/config'
import jwt from 'jsonwebtoken'
export class authenticate {
    async auth(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            await jwt.verify(token, process.env.JWT_SECRETE);
            next();
        } catch (error) {
            return res.status(401).json({ status: 401, message: "please login ,it seems you are not loged in" })
        }
    }
}