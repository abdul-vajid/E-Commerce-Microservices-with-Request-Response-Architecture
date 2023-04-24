import { Router } from 'express';
import controller from '../controller/routingController.js';
import rateLimiter from '../middlewares/rateLimiter.js'

const router = Router();

router.all('/:appName/:path(*)?',rateLimiter, controller.routeAll);

export default router;