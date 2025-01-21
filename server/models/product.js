import mongoose, { Schema } from "mongoose";

const purchasedSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const Purchased = mongoose.model("Purchased", purchasedSchema);

export default Purchased;
