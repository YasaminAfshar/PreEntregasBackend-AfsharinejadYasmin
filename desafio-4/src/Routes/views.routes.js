
import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();


router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", {products});
  } catch (error) {
    console.log(error);
  }
});


router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", {products});
  } catch (error) {
    console.log(error);
  }
});



export default router; 