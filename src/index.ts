import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";

// Load environment variables (works for both local and Vercel)
dotenv.config();

const app = express();

// CORS configuration - dynamic origins for production
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV === "development"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// API routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);

// Local development server
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the Express app for Vercel serverless functions
// Vercel's @vercel/node will automatically wrap this as a handler
export default app;
