import User from "../models/user.model.js";
import mongoose from "mongoose";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";

export const addInFavorite = async (req, res, next) => {
  const { user_id, product_id } = req.body;
  try {
    const currentUser = await User.findById(user_id);
    currentUser.favorite.push(product_id);
    await currentUser.save();
    res.status(200).json({ message: "Added to favorites successfully" });
  } catch (error) {
    next(error);
  }
};
export const deleteFromFavorite = async (req, res, next) => {
  const { user_id, product_id } = req.body;
  console.log(req.body.product_id);
  try {
    const currentUser = await User.findById(user_id);
    console.log(currentUser);
    currentUser.favorite = currentUser.favorite.filter(
      (item) => item !== product_id
    );
    console.log(currentUser);
    await currentUser.save();
    res.status(200).json({ message: "Delete from favorites successfully" });
  } catch (error) {
    next(error);
  }
};
export const deleteAllFavorites = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const currentUser = await User.findById(req.params.id);
    if (!currentUser) {
      return next(errorHandler(403, "Такого пользователя не существует!"));
    }

    currentUser.favorite = [];
    await currentUser.save();
    res.status(200).json({ message: "Delete all favorites successfully" });
  } catch (error) {
    next(error);
  }
};
export const addInCartProduct = async (req, res, next) => {
  const userId = req.params.id;
  const product = req.body.currentProduct;
  console.log(product);
  try {
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      next(errorHandler(401, "Пользователь не найден"));
    }
    const existingIndex = currentUser.cart.findIndex(
      (item) => item._id === product._id
    );
    if (existingIndex === -1) {
      currentUser.cart.push(product);
    } else {
      currentUser.cart[existingIndex] = product;
    }

    await currentUser.save();
    res.status(200).json({ message: "Added to cart successfully" });
  } catch (error) {
    next(error);
  }
};
export const addInCartProducts = async (req, res, next) => {
  const userId = req.params.id;
  let bodyProducts = req.body.products;
  bodyProducts = bodyProducts.map((item) => ({ _id: item, count: 1 }));

  console.log(bodyProducts);
  try {
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      next(errorHandler(401, "Пользователь не найден"));
    }
    currentUser.cart.push(...bodyProducts);

    await currentUser.save();
    res.status(200).json({ message: "Added to favorites successfully" });
  } catch (error) {
    next(error);
  }
};
export const deleteFromCart = async (req, res, next) => {
  const userId = req.params.id;
  const productId = req.body.productId;
  console.log(productId, userId);

  try {
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      next(errorHandler(401, "Пользователь не найден"));
    }
    currentUser.cart = currentUser.cart.filter(
      (item) => item._id !== productId
    );

    await currentUser.save();
    res.status(200).json({ message: "Delete From favorites successfully" });
  } catch (error) {
    next(error);
  }
};
export const updateOrders = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "Нет такого пользователя"));
    }

    user.order = [...user.order, req.body.orders];
    user.cart = [];
    await user.save();
    res.status(200).json("Заказы обновленны");
  } catch (error) {
    next(error);
  }
};
export const updatePassword = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "Вы можете обновить только свой аккаунт!"));

  try {
    const currentUser = await User.findById(req.params.id);
    const currentPassword = bcrypt.compareSync(
      req.body.password,
      currentUser.password
    );
    if (!currentPassword) {
      return next(errorHandler(401, "Почта и пароль не совпадают"));
    }

    const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "Вы можете обновить только свой аккаунт!"));
  const { region, phone, username, email } = req.body;
  try {
    const user = await User.findById(req.params.id);
    user.username = username;
    user.phone = phone;
    user.region = region;
    user.email = email;
    console.log(user);
    user.save();
    const { password, __v, createdAt, updatedAt, ...rest } = user._doc;
console.log(rest);
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
