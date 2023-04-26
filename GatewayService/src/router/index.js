import s2CRouter from './s2CRouter.js';
import s2SRouter from './s2SRouter.js';
import express from 'express';
import errorHandler from '../utils/handlers/errorHandler.js';
const app = express();

//Router to service-to-service(S2S) communication
app.use('/private', s2SRouter);

//Router to service-to-client(S2C) communication
app.use('/', s2CRouter);


app.use(errorHandler);

export default app;