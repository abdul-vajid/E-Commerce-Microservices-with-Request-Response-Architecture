import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import helmet from 'helmet';
app.use(helmet());

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

import router from './src/routers/index.js'
const PORT = process.env.PORT || 6000;

import logging from './src/middlewares/logging.js'
app.use(logging.requestLogger);

app.use('/api/v1/', router);

import errorHandler from './src/utils/handlers/errorHandler.js';
app.use(errorHandler);

/* MONGOOSE SETUP*/
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL
// const MONGO_URL = "mongodb://127.0.0.1:27017/ping_userDb"
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => {
        console.log(`User service is running in port ${PORT}`);
    })
}).catch((error) => {
    console.log(`${error} did not connect`)
    console.log(`User MongoDB disconnected.......`)
})