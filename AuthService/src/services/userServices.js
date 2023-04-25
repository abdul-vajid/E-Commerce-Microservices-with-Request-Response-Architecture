import User from "../models/userModel.js";
import produceMessage from '../utils/config/kafkaConfig.js'
import topicConstants from '../utils/constants/topicConstants.js'

// import bcrypt from 'bcrypt';

const addUser = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            await addAuthServiceUser(body)
                .then(addUserServiceUser)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
        } catch (error) {
            reject(error)
        }
    })
}

const addAuthServiceUser = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { fullname, email, password } = body;

            // const salt = await bcrypt.genSalt();
            // const passwordHash = await bcrypt.hash(password, salt);
            const passwordHash = password;

            if (!fullname || !email || !password) {
                reject('Please provide all required fields');
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                reject('User with this email already exists');
            }

            const newUser = new User({
                email,
                password: passwordHash,
            });
            const createdUser = await newUser.save();
            if (!createdUser) {
                console.log("User cannot be added");
                reject("User details not added");
            }
            else {
                console.log("User added");
                resolve({
                    fullname: fullname,
                    email: createdUser.email,
                    _id: createdUser._id
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

const addUserServiceUser = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            // axios call to user service
            console.log(response)
            resolve(body);
        } catch (error) {
            reject(error)
        }
    })
}

export default {
    addUser
}