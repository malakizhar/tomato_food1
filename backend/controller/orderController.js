import { orderModel } from "../Model/orderModel.js";
import userModel from "../Model/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51QCSfKHqg7eRWXsJmZsQknTDvxBVvqdxxaWsulu0Iy9PpwNbE1UhjLZLbmgx79zDJoDY0MVxEBUl1WAmkOVFEqci00ACsVAXT9"
);

const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
  try {
    console.log("Received data:", req.body);

    const { userId, items, amount, address } = req.body;
    if (
      !userId ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !amount ||
      !address
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save the new order
    const newOrder = new orderModel({ userId, items, amount, address });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "PKR",
        product_data: { name: item.name },
        unit_amount: item.price * 100 * 277, // Adjust based on your pricing logic
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "PKR",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 100 * 277,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, sessionId: session.url }); // Ensure this returns the URL
  } catch (error) {
    console.log("Error details:", error);
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" }); // Change TreeWalker to true
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    console.log("Error details:", error);
    res.json({ success: false, message: "Error" });
  }
};

//user orders for frontend

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error details:", error);
    res.json({ success: false, message: "Error" });
  }
};

//listing order for admin panal

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error details:", error);
    res.json({ success: false, message: "Error" });
  }
};

// api update stutus

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Update" });
  } catch (error) {
    console.log("Error details:", error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
