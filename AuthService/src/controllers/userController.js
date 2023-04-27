import validation from '../utils/validators/userValidator.js';
import userServices from '../services/userServices.js';
import ErrorResponse from '../utils/handlers/ErrorResponse.js';

const addUser = async (req, res, next) => {
    try {
        console.log("Inside register user controller")
        const body = await validation.user.validateAsync(req.body);
        await userServices.addUser(body)
        .then((response) => {
            res.status(201).send({status: 201, data: response});
        }).catch((error) => {
            return next(ErrorResponse.notFound(error));
        });
    } catch (error) {
        next(error)
    }
}


export default {
    addUser
}