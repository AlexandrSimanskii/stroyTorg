import express from "express";
import {
  addInFavorite,
  addInCartProduct,
  addInCartProducts,
  deleteFromFavorite,
  deleteAllFavorites,
  deleteFromCart,
  updateOrders,
  updatePassword,
  updateUser
} from "../controllers/user.controller.js";

const router = express.Router();

import { verifyToken } from "../utils/verifyUser.js";

router.patch("/favorite/add", addInFavorite);
router.patch("/:id/update/order/", updateOrders);
router.delete("/favorite/delete", deleteFromFavorite);
router.patch("/:id/favorites/delete", deleteAllFavorites);
router.post("/:id/cart/add", addInCartProduct);
router.post("/:id/cart/addall", addInCartProducts);
router.delete("/:id/cart/delete", deleteFromCart);
router.patch("/:id/password/update", verifyToken, updatePassword);
router.patch("/:id/update", verifyToken, updateUser);

export default router;
