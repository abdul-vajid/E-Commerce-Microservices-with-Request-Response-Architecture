import User from "../models/userModel.js";

const addUser = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
        const result = await User.create(body);
        console.log(result)
        if(!result) {
            console.log("User cannot be added");
            reject("User details not added");
        }
        else {
            console.log("User added");
            resolve(result);
        }
        } catch(error) {
            reject(error)
        }
    })
}

export default {
    addUser
}