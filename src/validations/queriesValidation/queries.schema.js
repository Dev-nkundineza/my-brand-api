import joi from "joi";

export const querySchema = joi.object({
    name: joi.string().max(60).required(),
    email: joi.string().required().empty().email(),
    message: joi.string().required().empty().max(1000),
    location: joi.string().required().empty(),
});