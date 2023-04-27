import axios from 'axios';
import registory from '../config/serviceRegistry.json' assert { type: "json" };
import fs from 'fs';
import logger from '../middlewares/logging.js';
import ErrorResponse from '../utils/handlers/ErrorResponse.js';
import logging from '../middlewares/logging.js';

const routeAll = (req, res, next) => {
    try {
        const appName = req.params.appName;
        const query = req.originalUrl.split('?')[1];
        const path = req.params.path;
        const baseUrl = getBaseUrl(appName, path, query);
        console.log(baseUrl)
        axios({
            method: "GET",
            url: "https://jsonplaceholder.typicode.com/todos/1",
            // headers: req.headers,
            // data: req.body
        }).then((response) => {
            console.log(response.data)
            res.send(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error)
            return next(ErrorResponse.notFound(error))
        })
        axios({
            method: req.method,
            url: baseUrl,
            headers: req.headers,
            data: req.body,
            timeout: 10000
        }).then((response) => {
            console.log(response)
            res.send(JSON.stringify(response.data));
        })
        .catch(error => {
            return next(new ErrorResponse.notFound(error.message))
        })
    } catch (err) {
        console.log(err)
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
            logger.log("error", error.message);
        }
    });
    let queryString = query ? `?${query}` : "";
    return `${api.url[index]}/${path ? path : ""}${queryString}`;
}

export default {
    routeAll
}