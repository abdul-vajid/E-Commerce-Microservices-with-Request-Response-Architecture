import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        console.log(req.params);
        if (!token) {
            if((req.params.appName === 'auth' && req.params.path !=='reset') || req.params.appName === 'public'){
                console.log("inside auth token");
                return next()
            }
            return res.status(403).send("Access Denied");
        }
        
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        } else {
            return res.status(403).send("Invalid Token");
        }
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).send("Unautherized Request");
        }
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default verifyToken;