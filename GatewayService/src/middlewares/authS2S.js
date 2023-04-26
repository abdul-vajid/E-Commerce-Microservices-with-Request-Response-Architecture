import authenticate from '../services/basicAuthService.js';
import ErrorResponse from '../utils/handlers/ErrorResponse.js';

const verifyBasicAuth = async (req, res, next) => {
    try {
        // check for basic auth header
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return next(ErrorResponse.unauthorized("Missing Authorization Headerd"));
        }
        // verify auth credentials         Basic username:password
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        console.log(username, password, req.params.appName)
        const user = await authenticate(username, password, req.params.appName);
        if (!user) {
            return next(ErrorResponse.unauthorized("Invalid Authentication Credentials"));
        }

        // next();
    } catch (error) {
        return next(error);
    }
}

export default verifyBasicAuth;