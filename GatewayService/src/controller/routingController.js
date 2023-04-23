import axios from 'axios';
import registory from '../config/serviceRegistry.json' assert { type: "json" };
import fs from 'fs';
import path from 'path';

const routeAll = (req, res, next) => {
    try {
        const appName = req.params.appName;
        const query = req.originalUrl.split('?')[1];
        const path = req.params.path;
        const api = registory.services[appName];
        if (!api) {
            console.error("Route not found for path = ", appName);
            res.status(404).send("Path not found")
        }
        let baseUrl = `${api[0].url}/${appName}/${path ? path : ""}?${query}`;
        axios({
            method: req.method,
            url: baseUrl,
            headers: req.headers,
            data: req.body
        }).then((response) => {
            res.send(JSON.stringify(response.data));
        })
    } catch (err) {
        console.error("Error occuered : ", err)
        next(err);
    }
}

const registerInstance = (req, res, next) => {
    try {
        const registrationInfo = req.body;
        registory.services[registrationInfo.appName].push({ ...registrationInfo });
        fs.writeFile('./src/config/serviceRegistry.json', JSON.stringify(registory), (error) => {
            if(error) {
                console.error("Cannot register instance");
                next(error);
            }
            else {
                res.status(201).send({status: 201, data: "New Instance created"});
            }
        })
    } catch (err) {
        console.error("Error occuered : ", err)
        next(err);
    }
}

export default {
    routeAll,
    registerInstance
}