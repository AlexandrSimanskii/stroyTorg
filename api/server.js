import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.router.js";
import newsRouter from "./routes/news.router.js";
import reviewRouter from "./routes/review.router.js";
import authRouter from "./routes/auth.router.js";
import usersRouter from "./routes/users.router.js";
import productRouterDB from "./routes/productDB.router.js";
import authRouterDB from "./routes/authDB.router.js";
import path from "path";


const __dirname = path.resolve();

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connect with MongoDB");
  })
  .catch((err) => console.log("Не удалось подключиться к MongoDB", err));
const PORT = process.env.PORT || 3004;
const allowedOrigins = [
  process.env.CORS_ORIGIN || "http://193.222.62.100",
  "https://vercel.com/alexs-projects-f142ab41/mebel-front",
];

app.listen(PORT, () => {
  console.log("Server is running on port 3004");
});

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});



app.use(cookieParser());
app.use(express.json());
app.use("/api", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/news", newsRouter);
app.use("/api/review", reviewRouter);
app.use("/api/productsDB", productRouterDB);
app.use("/api/authDB", authRouterDB);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.json(__dirname, "client", "dist", "index.html"));
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
