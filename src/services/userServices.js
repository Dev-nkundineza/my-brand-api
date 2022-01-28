import Profile from "../models/user.js";
export class UserServices {
    async createUser(data) {
            try {
                const profile = await Profile(data);
                profile.save();

                return profile;
            } catch (error) {
                console.log(error);
            }
        }
        // get all users
    async getUser() {
        try {
            const allUsers = await Profile.find();
            console.log(allUsers);
            return allUsers;

        } catch (error) {
            console.log(error);
        }

    }

    // get one user
    async getOneUser(id) {
            try {
                const user = await Profile.findOne({ _id: id });
                return user;

            } catch (error) {
                console.log(error);
            }
        }
        // update profile

    async updateProfile(id) {
        try {
            const getItem = await Profile.findOne({ _id: id });
            return getItem;

        } catch (error) {
            console.log(error);
        }
    }



    //delete user
    async deleteUser(id) {
        await Profile.deleteOne({ _id: id });
    }
}