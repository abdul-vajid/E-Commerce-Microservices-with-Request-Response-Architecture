import Joi from 'joi'

const user = new Joi.object({
    fullname : Joi.string().min(2).max(50).required(),
    email : Joi.string().email().required(),
    // password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

export default { user };