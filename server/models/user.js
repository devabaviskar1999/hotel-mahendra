import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true, // This means name is required
        trim: true, // Trim whitespaces
        unique: true,
      },
    password: {
        type: String,
        required: true, // This means name is required
      },
}, {timestamps: true})

const User = mongoose.model("User", userSchema)
export default User;