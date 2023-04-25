import validation from '../utils/validators/userValidator.js';
import userServices from '../services/userServices.js';

const addUser = async (req, res, next) => {
    try {
        const body = await validation.user.validateAsync(req.body);
        await userServices.addUser(body)
        .then((response) => {
            res.status(201).send({status: 201, data: response});
        }).catch((error) => {
            throw error;
        });
    } catch (error) {
        console.error(error)
        next(error)
    }
}


export default {
    addUser
}