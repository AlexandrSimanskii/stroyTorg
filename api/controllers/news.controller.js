import mongoose from "mongoose";
import News from "../models/news.model.js";

export const getNews = async (req, res) => { 
  try {
    const limit = req.query.limit || 8;

    const news = await News.find().limit(limit);

    res.json(news);
  } catch (error) {
    console.log(error);
  }
};
