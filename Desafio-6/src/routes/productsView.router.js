import { Router } from "express";
import ProductsDaoMongo from ".././daos/mongodb/products.dao.js";

const router = Router();
const productManager = new ProductsDaoMongo();

router.get("/", async (req, res) => {
  try {
    let products = await productManager.getProducts();
    const user = req.session.user;
    res.render("products", { products, user });
  } catch (error) {
    console.log(error);
  }
});

export default router;