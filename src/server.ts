import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

// db
import connectDB from "./config/db";

// Routes
import authRoutes from "./routes/authRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import reportRoutes from "./routes/reportRoutes";
import mongoose from "mongoose";
import limiter from "./utils/limiter";
import corsOptions from "./utils/cors";

// Load environment variables early
dotenv.config();

// Connect to MongoDB
connectDB();

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB Connection Closed");
  process.exit(0);
});

// Initialize Express App
const app = express();
app.disable("x-powered-by");

// Global Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use("/api", limiter);
app.use(cors(corsOptions));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/reports", reportRoutes);

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
