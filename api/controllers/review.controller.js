import Review from "../models/review.model.js";
import mongoose from "mongoose";

export const getReview = async (req, res, next) => {

  try {
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const limit = req.query.limit || 10;
    const startIndex = req.query.startIndex || 0;

    const totalReview = await Review.countDocuments();
    const totalPages = Math.ceil(totalReview / limit);

    const review = await Review.find()
      .sort({ createdAt: order })
      .limit(limit)
      .skip(startIndex);

    res.status(201).json({ review, totalPages });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  console.log(req.body);
  try {
    const review = await Review.create(req.body);
    return res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};
