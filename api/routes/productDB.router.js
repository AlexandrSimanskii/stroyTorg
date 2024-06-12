import express from "express";

import {
  getProductDB,
  getProductsDB,
} from "../controllers/productDB.controller.js";

const router = express.Router();

router.get("/get", getProductsDB);
router.get("/get/:id", getProductDB);

export default router;
