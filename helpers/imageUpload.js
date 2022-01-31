import cloudinary from "cloudinary";
import "dotenv/config";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_USER_NAME.toString(),
    api_key: process.env.CLOUDINARY_API_KEY.toString(),
    api_secret: process.env.CLOUDINARY_API_SECRET.toString(),
});

console.log(process.env.CLOUDINARY_USER_NAME);
export default cloudinary;