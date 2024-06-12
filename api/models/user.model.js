import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userScheme = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: { type: Array, required: true },
    favorite: { type: Array, required: true },
    order: { type: Array, required: true }, 
  },
  { timestamps: true }
);

const User = mongoose.model("User", userScheme);
export default User;
