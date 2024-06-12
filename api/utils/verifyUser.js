import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
 
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Пользователь не авторизирован!"));

  jwt.verify(token, "4jd93sddx4", (err, user) => {
    if (err) return next(errorHandler(403, "Токен не действителен"));

    req.user = user;
    next();
  });
};
