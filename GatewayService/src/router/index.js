import { Router } from 'express';
import controller from '../controller/routingController.js';

const router = Router();

router.all('/:appName/:path(*)?', controller.routeAll);

export default router;