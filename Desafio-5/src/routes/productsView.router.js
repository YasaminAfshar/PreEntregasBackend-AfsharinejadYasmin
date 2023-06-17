import { Router } from "express";
import ProductsDaoMongo from ".././daos/mongodb/products.dao.js";

const router = Router();
const productManager = new ProductsDaoMongo();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("products", { products });
  } catch (error) {
    console.log(error);
  }
});

export default router; 