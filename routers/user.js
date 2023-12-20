import { Router } from "express";

import registerUser from "../controllers/register.js";
import loginUser from "../controllers/login.js";

const router = Router();

//User register endpoint
router.post("/register", registerUser);

//User login endpoint
router.post("/login", loginUser);

export default router;
