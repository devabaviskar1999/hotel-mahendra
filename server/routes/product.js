import express from "express";
import { purchased, sale, stock } from "../controllers/item.js";
import { jwtTokenChecker } from "../middlewares/jwtTokenChecker.js";
const router = express.Router();

router.post("/purchased", jwtTokenChecker, purchased);
router.post("/sale", jwtTokenChecker, sale);
router.get("/stock", jwtTokenChecker, stock);

export default router;
