import { Router } from 'express';
import axios from 'axios';
import services from './config/serviceRegistry.config.js';

const router = Router();

router.all('/:appName', (req, res, next) => {
    const appName = req.params.appName;
    const api = services[appName];
    if (!api) {
        console.error("Route not found for path = ", appName);
        res.status(404).send("Path not found")
    }
    let baseUrl = `${api.url}/${appName}`;
    axios({
        method: req.method,
        url: baseUrl,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(JSON.stringify(response.data));
    })
})

export default router;