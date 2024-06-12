import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userDBSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  number: { type: String, unique: true },
  orders: { type: Array, default: [] },
  carts: { type: Array, default: [] },
  secondName: { type: String },

  sity: { type: String },
  street: { type: String },
  home: { type: String },
  flat: { type: String },
});

const UsersDB = mongoose.model("usersDB", userDBSchema);

export default UsersDB;