import axios from 'axios';
import registory from '../config/serviceRegistry.json' assert { type: "json" };
import fs from 'fs';
import logger from '../middlewares/logging.js';

const routeAll = (req, res, next) => {
    try {
        const appName = req.params.appName;
        const query = req.originalUrl.split('?')[1];
        const path = req.params.path;
        const baseUrl = getBaseUrl(appName, path, query);
        // logger.log('silly', 'This is a silly log message');
        // logger.log('debug', 'This is a debug log message');
        axios({
            method: req.method,
            url: baseUrl,
            headers: req.headers,
            data: req.body
        }).then((response) => {
            res.send(JSON.stringify(response.data));
        })
    } catch (error) {
        return next(err);
    }
}

const getBaseUrl = (appName, path, query) => {
    const api = registory.services[appName];
    if (!api) {
        throw new ErrorResponse.notFound("Route not found for path : ", appName)
    }
    const length = api.url.length;
    let index = api.index;

    if (length - 1 <= index) {
        index = 0;
    }
    else {
        index++;
    }
    registory.services[appName].index = index;
    fs.writeFile('./src/config/serviceRegistry.json', JSON.stringify(registory), (error) => {
        if (error) {
            logger.log('error', error.message);
        }
    });
    return `${api.url[index]}/${appName}/${path ? path : ""}?${query}`;
}

export default {
    routeAll
}