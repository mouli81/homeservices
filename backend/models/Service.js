import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
