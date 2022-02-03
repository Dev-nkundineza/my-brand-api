import joi from "@hapi/joi";

export const userSchema = joi.object({
    username: joi.string().required().max(100).messages({
        "string.base": "username must be valid",
        "string.empty": "username must not be empty",
        "string.max": "username should not exceed 100 characters",
        "any.required": "username is required"

    }),
    email: joi.string().email().required().messages({
        "string.base": "email must be valid",
        "string.empty": "email must not be empty",
        "string.email": "email  must be valid",
        "any.required": "email is required"

    }),
    password: joi
        .string()
        .min(6)
        .max(15)
        .pattern(
            new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        )
        .required()
        .messages({
            "string.base": "password must be valid",
            "string.empty": "password is not allowed to be empty",
            "string.min": "password is too short , must have atleast 6 characters",
            "string.max": "Password exceeds 15 characters",
            "any.required": "password is required",
            "string.pattern.base": "email should contain special characters and numbers..."

        })
})