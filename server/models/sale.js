import mongoose, { Schema } from "mongoose";
const saleSchema = new Schema({
  employee: {
    type: String,
    unique: true,
    required: true,
  },
  productName: {
    type: String,
    unique: true,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    enum: ["gram", "bottle", "packet"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Sale = mongoose.model("Employee", saleSchema);

export default Sale;
