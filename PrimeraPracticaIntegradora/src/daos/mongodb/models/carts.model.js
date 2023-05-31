
import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  product: { type: Array, default: [] }
});

export const CartsModel = mongoose.model(cartsCollection, cartsSchema);