import mongoose from "mongoose";

const Scheme = mongoose.Schema;

const newsSchema = new Scheme(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    information: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const News = mongoose.model("news", newsSchema);

export default News;
