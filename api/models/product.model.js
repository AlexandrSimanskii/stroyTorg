import mongoose from "mongoose";

const Scheme = mongoose.Schema;

const productsSchema = new Scheme(
  {
    name: { type: String, required: true },
    type: { type: String, required: false },
    category: { type: String, required: true },
    label: { type: String, required: true },
    article: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    discountPrice: { type: Number, required: false },
    sale: { type: Number, required: false },
    characteristics: { type: Object },
    images: { type: Array, required: true },
    description: { type: String, required: false },
    isLike: { type: Boolean, required: false },
  },
  { timestamps: true }
);

const Products = mongoose.model("products", productsSchema);

export default Products;
