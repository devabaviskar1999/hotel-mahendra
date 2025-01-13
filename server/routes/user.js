import express from "express";
import signInHandler from "../controllers/auth.js";
const router = express.Router();

router.post("/signin", signInHandler);

export default router;