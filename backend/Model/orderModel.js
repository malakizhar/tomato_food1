import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({ // Capitalize 'Schema'
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "Food is processing",
  },
  date: {
    type: Date, // Correct type to 'Date'
    default: Date.now, // Correct method call to 'Date.now'
  },
  payment: {
    type: Boolean,
    default: false,
  },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export { orderModel };