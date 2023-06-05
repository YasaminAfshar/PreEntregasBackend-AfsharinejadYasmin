
import { Router } from "express";

import { getAllProductsService } from "../services/products.services.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.render("home", {products});
  } catch (error) {
    console.log(error);
  }
});

export default router;