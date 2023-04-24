import { Router } from 'express';
import controller from '../controller/routingController.js';
import rateLimiter from '../middlewares/rateLimiter.js'
import verifyToken from '../middlewares/auth.js'

const router = Router();

router.all('/:appName/:path(*)?',rateLimiter, verifyToken, controller.routeAll);

export default router;