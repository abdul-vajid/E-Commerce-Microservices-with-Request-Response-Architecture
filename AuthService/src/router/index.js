import { Router } from 'express';
import controller from '../controllers/userController.js';

const router = Router();

router.post('/register', controller.addUser)

export default router;