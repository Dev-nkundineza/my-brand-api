import joi from "@hapi/joi";

export const querySchema = joi.object({
    name: joi.string().max(60).required().messages({
        "string.base": "name must be valid",
        "string.empty": "name is not allowed to be empty",
        "string.max": "name exceeds 60 characters",
        "any.required": "name is required",
    }),
    email: joi.string().required().empty().email().messages({
        "string.base": "email must be valid",
        "string.empty": "email is not allowed to be empty",
        "string.email": "email must be valid",
        "any.required": "email is required",
    }),
    message: joi.string().required().empty().max(1000).messages({
        "string.base": "message must be valid",
        "string.empty": "message is not allowed to be empty",
        "string.max": "message is too long ",
        "any.required": "message is required",
    }),
    location: joi.string().required().empty().messages({
        "string.base": "location must be valid",
        "string.empty": "location is not allowed to be empty",
        "any.required": "location is required",
    }),
});