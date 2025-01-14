import express from "express";
import {signInHandler,signUpHandler } from "../controllers/auth.js";
const router = express.Router();

router.post("/signin", signInHandler);
router.post("/signup", signUpHandler);

export default router;