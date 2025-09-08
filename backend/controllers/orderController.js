import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // secret key from .env

// Place user order & create PaymentIntent
const placeOrder = async (req, res) => {
  try {
    const { userId, items, address, amount } = req.body;

    // Save order in DB
    const newOrder = new orderModel({ userId, items, address, amount });
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // amount in cents
      currency: "usd",
      metadata: { orderId: newOrder._id.toString() },
    });

    // Return client_secret to frontend
    res.json({
      success: true,
      client_secret: paymentIntent.client_secret,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error creating order" });
  }
};

// Verify payment (after frontend confirms with Stripe)
const verifyOrder = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const orderId = paymentIntent.metadata.orderId;

    if (paymentIntent.status === "succeeded") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment succeeded" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
};

// User orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// List all orders for admin
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Update order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
