import mongoose from "mongoose";
import { config } from "dotenv"   //secret data keys storage
config(); 

const URI = process.env.MONGO_SERVER_URL
const connectToMongoDB = async () => {
try{
await mongoose.connect(URI )
console.log("Mongoose connected!")
}catch(error){
 console.log("something went error!")
}
}

export default connectToMongoDB;

