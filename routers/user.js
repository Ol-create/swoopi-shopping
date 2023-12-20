import { Router } from "express";

import registerUser from "../controllers/register";
import loginUser from "../controllers/login";

const router = Router();

//User register endpoint
router.post("/register", registerUser);

//User login endpoint
router.post("/login", loginUser);

export default router;
