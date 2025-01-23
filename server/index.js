import express from "express"; //node js framework
import cors from "cors"; //cross scripting package
import { config } from "dotenv"; //secret data keys storage
import connectToMongoDB from "./dbConnection/db.js";
const app = express();
const PORT = process.env.PORT  //server port
import userAuth from "./routes/user.js";
import product from "./routes/product.js";
import cookieParser from "cookie-parser";
config(); //dotenv config
connectToMongoDB();
const corsOptions = {
  //private cors connections
  origin: `${process.env.FRONTEND_URL}`,
  methods: ["POST", "PUT"],
  allowedHeaders: ["Content-Type"],
  credentials:true
};
app.use(cookieParser());
app.use(cors(corsOptions)); //cors middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", userAuth);
app.use("/product", product);

app.listen(PORT, () => console.log(`Server is listening on port:${PORT}`)); //server is running
