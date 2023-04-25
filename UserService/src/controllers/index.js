import User from '../models/userModel.js'
import validation from '../utils/validator/userValidator.js'
import service from '../services/userServices.js'; 

const addUser = async (req, res, next) => {
    try {
        const body = await validation.user.validateAsync(req.body);
        service.addUser(body).then((response) => {
            res.status(201).send({status: 201, data: response});
        }).catch((error) => {
            throw error;
        });
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const findUser = async (req, res, next) => {
    try {
        const emailFromUser = req.body.email
        if (!emailFromUser) {
            res.status(501).send({ status: 501, error: "Invalid email" })
        }

        const user = await User.findOne({ email: emailFromUser })

        if (!user) {
            res.status(501).send({ status: 501, error: "User credentials not available" })
        }

        res.status(201).send({ status: 201, data: user })
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (users) {
            res.status(200).json({ users });
        } else {
            return res.status(400).json({ error: "User's Data Not Available" });
        }
    } catch (error) {
        next(error)
    }
};




export { getAllUsers, findUser, addUser }