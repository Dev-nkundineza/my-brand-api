import Account from "../models/user.js";

export const userExist = async(email) => {
    const user = await Account.findOne({ email: email });
    if (user) {
        return user;
    } else {
        return false;
    }
};

export const createUser = async(user) => {
    const userCreated = await Account(user);
    userCreated.save();
    return userCreated;
};