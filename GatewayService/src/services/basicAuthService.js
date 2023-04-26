import registory from '../config/serviceRegistry.json' assert { type: "json" };

const authenticate = async (username, password, appName) => {
    try {
        const service = await registory.services[appName];
        if(service.username === username && service.password === password) {
            return true;
        }
        else {
            return false;
        }
    } catch(err) {
        throw err;
    }
}

export default authenticate;