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

// update profile
export const updateUser = async(id) => {
    try {
        const user = await Account.findOne({ _id: id })
        if (user) {
            return user;
        } else {
            throw new Error("no such user")
        }
    } catch (error) {
        console.log(error);
    }

}