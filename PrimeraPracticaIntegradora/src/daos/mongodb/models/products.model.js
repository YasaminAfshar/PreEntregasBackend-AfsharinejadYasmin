
import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 250 },
  description: { type: String, required: true, maxLength: 500 },
  price: { type: Number, required: true },
  code: { type: String, required: true, unique: true, maxLength: 6 },
  category: { type: String, required: true },
  stock: { type: Number, required: true, max: 100 },
  thumbnails: { type: String, required: true },
  status: { type: Boolean, default: true },
});

export const ProductsModel = mongoose.model(productsCollection, productsSchema);