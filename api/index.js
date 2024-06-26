import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.router.js";
import newsRouter from "./routes/news.router.js";
import reviewRouter from "./routes/review.router.js";
import authRouter from "./routes/auth.router.js";
import usersRouter from "./routes/users.router.js";

const app = express();

dotenv.config();

mongoose
  .connect("mongodb+srv://StroyOptTorg:StroyOptTorg@cluster0.tzfh0vd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connect with MongoDB");
  })
  .catch((err) => console.log("Не удалось подключиться к MongoDB", err));
const PORT = process.env.PORT || 3004;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "https://stroy-torg.vercel.app";

app.listen(PORT, () => {
  console.log("Server is running on port 3004");
});


app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
}));


app.use(cookieParser());
app.use(express.json());
app.get("/api/a",(req,res)=>{
  res.json({mess:"привэт"})
})
app.use("/api", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/news", newsRouter);
app.use("/api/review", reviewRouter);





app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
