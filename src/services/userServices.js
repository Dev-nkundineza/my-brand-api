import Profile from "../models/user.js"

export class UserServices {
    async createUser(data) {
        try {
            const profile = await Profile(data)
            profile.save()

            return profile

        } catch (error) {
            console.log(error);
        }

    }
    getUser() {}
    getUser(id) {}
    updateProfile(id) {}
    deleteUser(id) {}
}