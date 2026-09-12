import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    description: { type: String, default: "" },
    type: { type: String, enum: ["percent", "flat"], default: "percent" },
    value: { type: Number, required: true, min: 0 },
    minOrderValue: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: 0 },
    usageLimit: { type: Number, default: 0 },
    usedCount: { type: Number, default: 0 },
    startsAt: Date,
    expiresAt: Date,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

couponSchema.methods.isValidNow = function isValidNow(subtotal) {
  const now = new Date();
  if (!this.isActive) return "This coupon is no longer active.";
  if (this.startsAt && now < this.startsAt) return "This coupon is not active yet.";
  if (this.expiresAt && now > this.expiresAt) return "This coupon has expired.";
  if (this.usageLimit && this.usedCount >= this.usageLimit) return "This coupon has been fully redeemed.";
  if (subtotal < this.minOrderValue) return `Add items worth ₹${this.minOrderValue} to use this coupon.`;
  return null;
};

couponSchema.methods.discountFor = function discountFor(subtotal) {
  let discount = this.type === "percent" ? (subtotal * this.value) / 100 : this.value;
  if (this.maxDiscount) discount = Math.min(discount, this.maxDiscount);
  return Math.min(Math.round(discount), subtotal);
};

export const Coupon = mongoose.model("Coupon", couponSchema);
