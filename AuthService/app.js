import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import router from './src/router/index.js'
app.use('/api/v1/', router);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Auth Service is running in port ${PORT}`);
})