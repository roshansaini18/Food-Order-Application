import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App config
const app = express();

// Use Render-provided port or fallback to 4000 for local development
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// CORS configuration
// Option 1: Allow any origin (for testing)
app.use(cors());

// Option 2: Allow only your frontend URL (recommended for production)
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
// app.use(cors({ origin: FRONTEND_URL }));

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("API working");
});

// Run Express server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
