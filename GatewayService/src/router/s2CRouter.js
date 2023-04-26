import { Router } from 'express';
import controller from '../controller/routingS2CController.js';
import rateLimiter from '../middlewares/rateLimiter.js'
import verifyToken from '../middlewares/authS2C.js'

const router = Router();

router.all('/:appName/:path(*)?',rateLimiter, verifyToken, controller.routeAll);

export default router;