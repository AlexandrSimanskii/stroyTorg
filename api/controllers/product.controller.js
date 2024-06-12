import Product from "../models/product.model.js";
import mongoose from "mongoose";
import { errorHandler } from "../utils/error.js";

export const getProducts = async (req, res, next) => {


  try {
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const label = req.query.label ? req.query.label.split(",") : [];
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const category = req.query.category || "";
    const searchTerm = req.query.searchTerm || "";
    const price = req.query.price?.split(",") || [0, Infinity];
    const type = req.query.type || "";
    let priceGte = price[0];
    let priceLte = price[1];

    let sortOptions = {};

    if (sort === "regularPrice") {
      sortOptions = { discountPrice: order, regularPrice: order };
    } else {
      sortOptions = { name: order };
    }

    let query = {
      name: { $regex: searchTerm, $options: "i" },
      type: { $regex: type, $options: "i" },
      category: { $regex: category, $options: "i" },
      regularPrice: { $gte: priceGte, $lte: priceLte },
    };
    if (label.length) {
      query.label = label;
    }

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(limit)
      .skip(startIndex);

    if (!products) {
      return next(
        errorHandler(404, "Продуктов с такими параметрамине найдено!")
      );
    }

    return res.status(200).json({ products, totalPages });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(errorHandler(404, "Такого обьявления не существует!"));
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getMinMaxPrices = async (req, res, next) => {
  try {
    const minMaxPrices = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: "$regularPrice" },
          maxPrice: { $max: "$regularPrice" },
          minDiscountPrice: { $min: "$discountPrice" },
          maxPrice: { $max: "$regularPrice" },
        },
      },
    ]);

    const minPrice =
      (await minMaxPrices[0].minPrice) > minMaxPrices[0].minDiscountPrice
        ? minMaxPrices[0].minDiscountPrice
        : minMaxPrices[0].minPrice;

    const maxPrice = await minMaxPrices[0].maxPrice;

    const data = [minPrice, maxPrice];

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getFavorite = async (req, res, next) => {
  const productIds = req.body;
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getUserCart = async (req, res, next) => {
  try {
    const queryProduct = req.body.product;
    console.log(queryProduct);
    const products = await Product.find({ _id: { $in: queryProduct } });
    if (!products) {
      next(errorHandler(403, "Ошибка при получении продуктов"));
    }

    const data = products.map((item) => {
      const newData = {
        _id: item._id,
        name: item.name,
        regularPrice: item.regularPrice,
        article: item.article,
        img: item.images[0],
      };
      if (item.discountPrice) {
        newData.discountPrice = item.discountPrice;
      }
      const quentity = queryProduct.findIndex(
        (elem) => elem._id === item._id.toString()
      );
      newData.count = queryProduct[quentity].count;
      return newData;
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
