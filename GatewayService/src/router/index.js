import { Router } from 'express';
import axios from 'axios';
import services from './config/serviceRegistry.config.js';

const router = Router();

router.all('/:appName', (req, res, next) => {
    const appName = req.params.appName;
    let baseUrl = `${services[appName].url}/${appName}`;
    axios.get(baseUrl).then((response) => {
        res.send(JSON.stringify(response.data));
    })
})

export default router;