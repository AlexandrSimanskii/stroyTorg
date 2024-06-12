import express from "express";

import {
  getMinMaxPrices,
  getProducts,
  getProduct,
  getFavorite,
  getUserCart,
} from "../controllers/product.controller.js";

const router = express.Router();
router.get("/get", getProducts);
router.post("/get/cart", getUserCart);
router.get("/get/:id", getProduct);
router.get("/prices", getMinMaxPrices);
router.post("/favorite/get", getFavorite);

export default router;
