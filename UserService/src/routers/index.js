import express from "express"
import {getAllUsers, findUser, addUser } from "../controllers/index.js"

const router = express.Router();

router.get("/findUser", findUser);
router.post("/user", addUser);

router.get("/getAllUsers", getAllUsers);

export default router;