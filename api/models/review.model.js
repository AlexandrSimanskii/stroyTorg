import mongoose from "mongoose";

const Scheme = mongoose.Schema;

const reviewSchema = new Scheme(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    text: { type: String, required: true },
    imageUrls: { type: Array },
  },
  { timestamps: true }
);

const Review = mongoose.model("reviews", reviewSchema);

export default Review;
