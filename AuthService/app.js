import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

import router from './src/router/index.js'
app.use('/api/v1/', router);

import errorHandler from './src/utils/handlers/errorHandler.js';
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

/* MONGOOSE SETUP*/
import mongoose from 'mongoose';
const MONGO_URL = process.env.MONGO_URL;
// const MONGO_URL = "mongodb://127.0.0.1:27017/ping_authDb"
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => {
        console.log(`Auth Service is running in port ${PORT}`);
    })
}).catch((error) => {
    console.log(`${error} did not connect`)
    console.log(`Auth MongoDB disconnected.......`)
})

