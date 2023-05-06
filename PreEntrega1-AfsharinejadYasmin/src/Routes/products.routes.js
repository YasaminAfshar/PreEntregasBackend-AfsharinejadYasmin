
import { Router } from "express";
import  ProductManager  from "../Managers/ProductManager.js";
import { productValidator } from "../middlewares/productValidator.js";

const router = Router();
const productManager = new ProductManager();


router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const { limit } = req.query;
    const productsLimit = products.slice(0, parseInt(limit));
    if (!limit) {
      res.status(200).send({ status: "success", payload: products });
    } else {
      res.status(200).send({ status: "success", payload: productsLimit });
    }
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
    console.error(error);
  }
});


router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productManager.getProductById(Number(pid));
    if (products) {
      res.status(200).send({
        status: "success",
        message: `The product with id ${pid} was found:`,
        payload: products,
      });
    } else {
      res
        .status(404)
        .send({
          status: "error",
          error: `The product with id ${pid} was not found`,
        });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
    console.error(error);
  }
});


router.post("/", productValidator, async (req, res) => {
  try {
    const product = req.body;
    const newProducts = await productManager.addProduct(
      product.title,
      product.description,
      product.price,
      product.thumbnail,
      product.code,
      product.category,
      product.stock
    );

    res.status(200).json(newProducts);
    
  } catch (error) {
    res.status(404).send({ status: "error", message: error.message });
    console.error(error);
  }
});


router.put("/:pid", async (req, res) => {
  try {
    const product = req.body;
    const { pid } = req.params;
    const productFile = await productManager.getProductById(Number(pid));

    if (productFile) {
      await productManager.updateProduct(Number(pid), product);
      res.status(200).send({status: "success", message: "The product was successfully updated!"});
    } else {
      res.status(404).send({ status: "error", error: "Product not found!" });
    }
  } catch (error) {
    res.status(404).send({ status: "error", message: error.message });
    console.error(error);
  }
});


router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productManager.getProducts();
    if (products.length > 0) {
      await productManager.deleteProduct(Number(pid));
      res
        .status(200)
        .send({
          status: "success",
          message: `Product id: ${pid} deleted successfully!`,
        });
    } else {
      res
        .status(500)
        .send({ status: "error", error: `Product id: ${pid} not found` });
    }
  } catch (error) {
    res.status(404).send({ status: "error", message: error.message });
    console.error(error);
  }
});


router.delete("/", async (req, res) => {
  try {
    await productManager.deleteAllProducts();
    res
      .status(200)
      .send({ status: "success", message: "¡Product deleted successfully!" });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
    console.error(error);
  }
});


export default router;