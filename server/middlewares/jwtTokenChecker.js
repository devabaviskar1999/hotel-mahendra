import jwt from "jsonwebtoken";
import { config } from "dotenv"; //secret data keys storage
config();
export const jwtTokenChecker = (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (token) {
      const checkToken = jwt.verify(token, process.env.JWT_SECRET);
      if (checkToken) {
        next();
      }
    }
  } catch (error) {
    console.log("jwt token invalid", error.message);
    return res.status(400).json({ message: "Jwt token invalid!" });
  }
};
