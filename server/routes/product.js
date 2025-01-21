import express from "express"
import { purchased } from "../controllers/Product.js";
import { jwtTokenChecker } from "../middlewares/jwtTokenChecker.js";
const router = express.Router();

router.post("/purchased",jwtTokenChecker, purchased)

export default router
