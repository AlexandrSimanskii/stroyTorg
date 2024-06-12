import mongoose from "mongoose";
import Users from "../models/userDB.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { email, username, number, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new Users({
    email,
    username,
    number,
    password: hashedPassword,
  });
  try {
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

    await newUser.save();
    const { password, ...rest } = newUser._doc;
    res.cookie("access_token", token, { httpOnly: true });
    res.status(201).json(rest);
  } catch (error) {
    next(errorHandler(401, "Пользователь не создан!"));
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await Users.findOne({ email });
    console.log(validUser, 666);
    if (!validUser) {
      return next(errorHandler(404, "Пользователь с такой почтой не найден"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Почта и пароль не совпадают"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
