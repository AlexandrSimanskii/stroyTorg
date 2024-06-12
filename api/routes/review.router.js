import express from "express";

import { getReview,createReview } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/get", getReview);
router.post("/post", createReview);

export default router;
