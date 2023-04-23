import { Router } from 'express';
import axios from 'axios';
const router = Router();

router.all('/:appName', (req, res, next) => {
    const appName = req.params.appName;
    let baseUrl = '';
    console.log("App name is ", req.params.appName);
    if (appName == "auth") {
        baseUrl = "http://localhost:5001/api/v1/authservice"
    }
    else if (appName == "post") {
        baseUrl = "http://localhost:5002/api/v1/postservice"
    }
    axios.get(baseUrl).then((response) => {
        res.send(JSON.stringify(response.data));
    })
})

export default router;