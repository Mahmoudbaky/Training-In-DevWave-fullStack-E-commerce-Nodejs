import CartItem from "./cartItem.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [CartItem.schema],
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Calculate total amount before saving
cartSchema.pre("save", function (next) {
  this.totalAmount = parseFloat(
    this.items
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2)
  );
  next();
});

// Index for better performance
cartSchema.index({ user: 1, isActive: 1 });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
