import express from "express";
import { emptyStock, purchased, sale, stock, suggestions } from "../controllers/item.js";
import { jwtTokenChecker } from "../middlewares/jwtTokenChecker.js";
const router = express.Router();

router.post("/purchased", jwtTokenChecker, purchased);
router.post("/sale", jwtTokenChecker, sale);
router.get("/stock", jwtTokenChecker, stock);
router.get("/suggestions", jwtTokenChecker, suggestions);
router.get("/empty-stock", jwtTokenChecker, emptyStock);

export default router;
