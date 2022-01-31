import joi from "@hapi/joi";

export const userSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi
        .string()
        .min(6)
        .max(10)
        .pattern(
            new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        )
        .message("Password is short,it should contain characters and numbers ")
        .required(),
});