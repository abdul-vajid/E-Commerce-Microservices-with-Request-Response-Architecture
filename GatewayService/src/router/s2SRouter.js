import { Router } from 'express';
import s2Scontroller from '../controller/routingS2SController.js';
import verifyBasicAuth from '../middlewares/authS2S.js'

const router = Router();

router.all('/:appName/:path(*)?', verifyBasicAuth, s2Scontroller.routeAll);

export default router;