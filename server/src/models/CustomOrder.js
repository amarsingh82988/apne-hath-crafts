import mongoose from "mongoose";

const customOrderSchema = new mongoose.Schema(
  {
    requestNumber: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: String,
    projectType: String,
    colors: String,
    budget: String,
    deadline: String,
    details: { type: String, required: true },
    referenceImages: [String],
    status: {
      type: String,
      enum: ["new", "in_review", "quoted", "accepted", "in_production", "completed", "declined"],
      default: "new",
    },
    quoteAmount: Number,
    adminNote: String,
  },
  { timestamps: true },
);

export const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);
