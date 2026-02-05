import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import dashboardRoutes from "./routes/dashboardRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

/*  Fix __dirname (ESM) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*  Middlewares */
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); //  optional but recommended

app.use(cors({
  origin: [
    "http://localhost:5173",          // local frontend (Vite)
    "http://localhost:3000",          // local frontend (CRA)
    "https://your-frontend.vercel.app" // Vercel frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*  Static uploads */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/*  API Routes */
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

/*  MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected (Local)"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

/* 🔹 Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
