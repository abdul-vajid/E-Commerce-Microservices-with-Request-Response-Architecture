import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import helmet from 'helmet';
app.use(helmet());

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

import router from './src/router/index.js'
const PORT = process.env.PORT || 5000;

import logging from './src/middlewares/logging.js'
app.use(logging.requestLogger); 

app.use('/api/v1/', router);

app.listen(PORT, () => {
    console.log(`API Gateway is running in port ${PORT}`);
})