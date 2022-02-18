import Account from "../models/user.js";
import { hashPassword } from "../helpers/passwordSecurity.js"

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
export const updateUser = async(id, data) => {
    try {
        const user = await Account.findOne({ _id: id })
        if (!user) {
            return false;
        } else {



            user.username = data.username ? data.username : user.username;
            user.email = data.email ? data.email : user.email;
            user.password = data.password ? await hashPassword(data.password) : user.password;
            user.picture = data.picture ? data.picture : user.picture;
            const updatedUser = await user.save();
            return updatedUser;
        }
    } catch (error) {
        console.log(error);
    }

}


export const allUsers = async() => {
    const user = await Account.find();
    if (user) {
        return user;
    } else {
        return false;
    }
};


export const getUser = async(id) => {
    const singleUser = await Account.findOne({ _id: id });
    return singleUser;
}

export const deleteUser = async(id) => {
    const deletedUser = await Account.findByIdAndDelete({ _id: id });
    return deletedUser;
}