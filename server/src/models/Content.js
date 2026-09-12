import mongoose from "mongoose";

// Simple CMS: key/value blocks for pages, banners, FAQ, testimonials, policies.
const contentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, lowercase: true, index: true },
    type: { type: String, enum: ["page", "banner", "faq", "testimonial", "setting"], default: "page" },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Content = mongoose.model("Content", contentSchema);

const messageSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, lowercase: true },
    subject: String,
    message: String,
    handled: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const ContactMessage = mongoose.model("ContactMessage", messageSchema);

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);
