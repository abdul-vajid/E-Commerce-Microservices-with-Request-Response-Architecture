import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

import router from './src/router/index.js'
app.use('/api/v1/', router);

const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
    console.error(JSON.stringify(err));
    res.status(500).send({status: 500, message: JSON.stringify(err)});
})

/* MONGOOSE SETUP*/
import mongoose from 'mongoose';
const MONGO_URL = process.env.MONGO_URL;
// const MONGO_URL = "mongodb://authServiceMongo:27013/ping_authDb"
console.log("------------Mongo URL--------------", MONGO_URL);
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

