import express from "express"    //node js framework
import cors from "cors"          //cross scripting package   
import { config } from "dotenv"   //secret data keys storage
import connectToMongoDB from "./dbConnection/db.js"
const app = express()    
const PORT = process.env.PORT || 4000  //server port
import userAuth from "./routes/user.js"

config();                                //dotenv config   
connectToMongoDB()
const corsOptions = {                    //private cors connections
    origin: "http://localhost:5173",
    methods: ["POST", "PUT"],
    allowedHeaders: ["Content-Type"]
}
app.use(cors(corsOptions))                //cors middleware      
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/auth", userAuth)
app.listen(PORT, () => console.log(`Server is listening on port:${PORT}`))   //server is running