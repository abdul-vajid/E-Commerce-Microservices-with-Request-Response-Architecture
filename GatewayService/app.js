import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
import router from './src/router/index.js'
const PORT = process.env.PORT || 5000;

app.use('/api/v1/', router);


app.listen(PORT, () => {
    console.log(`API Gateway is running in port ${PORT}`);
})