import mongoose from "mongoose";
// import Products from "../models/productDB.models.js";
import Products from "../models/productDB.model.js";

export const getProductDB = async (req, res) => {
  console.log(req.params);
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const getProductsDB = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const pages = parseInt(req.query.pages - 1) * limit || 0;
    const order = req.query.order || "desc";

    const searchTerm = req.query.searchTerm || "";
    let sort = req.query.sort || "rating";

    let priceGte = req.query.price_gte || 0;
    let priceLte = req.query.price_lte || Infinity;

    let category = req.query.category_like || req.query.category || "";
    if (category === "false") {
      category = "";
    }

    const products = await Products.find({
      sort: { $regex: searchTerm, $options: "i" },
      category: { $regex: category, $options: "i" },
      price: { $gte: priceGte, $lte: priceLte },
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(pages);

    const totalCount = await Products.countDocuments({
      sort: { $regex: searchTerm, $options: "i" },
      category: { $regex: category, $options: "i" },
      price: { $gte: priceGte, $lte: priceLte },
    });

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json(req.query.pages ? { products, totalPages } : products);
  } catch (error) {
    console.log(error);
  }
  console.log(req.query);
};
