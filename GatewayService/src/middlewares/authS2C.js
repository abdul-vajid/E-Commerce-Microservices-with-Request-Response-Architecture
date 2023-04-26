import jwt from 'jsonwebtoken'
import ErrorResponse from '../utils/handlers/ErrorResponse.js';

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        console.log(req.params);
        if (!token) {
            if((req.params.appName === 'auth' && req.params.path !=='reset') || req.params.appName === 'public'){
                console.log("inside auth token");
                return next()
            }
            return new ErrorResponse.forbidden("Access Denied");
        }
        
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        } else {
            return new ErrorResponse.forbidden("Invalid Token");
        }
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return new ErrorResponse.unauthorized("Unautherized Request");
        }
        req.user = verified;
        next();
    } catch (error) {
        return next(error);
    }
}

export default verifyToken;