import { Router } from 'express';

const router = Router();

router.get('/:appName', (req, res, next) => {
    console.log("App name is ", req.params.appName);
    res.send(`Hello ${req.params.appName} from Auth Service`);
})

export default router;