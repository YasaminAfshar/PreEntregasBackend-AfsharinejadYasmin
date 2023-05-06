
import { Router } from "express";
import CartManager from "../Managers/CartManager.js";


const router = Router();
const cartManager = new CartManager();


router.get("/", async (req, res) => {
  try {
    const cart= await cartManager.getAllCart();
    res.status(200).send({status: "success", message:"Cart was found", payload: cart})
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
    console.error(error);
  }
})


router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const carts = await cartManager.getCartById(Number(cid));
    if (carts) {
      res.status(200).send({
        status: "success",
        message: `The cart width ID ${cid} was found:`,
        payload: carts,
      });
    } else {
      res.status(404).send({
        status: "error",
        error: `The cart was not found`,
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
    console.error(error);
  }
});


router.post("/", async (req,res) => {
 try {
    await cartManager.createCart();
    res.status(200).send({status:"success", message: "Cart created successfully!"})
 } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
    console.error(error);
 }
});


router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const product = await cartManager.addProductToCart(Number(cid), Number(pid));
    if (product){
        res.status(201).send({ status: "success", mensaje: "Product successfully added to cart!", payload: product });
    }else {
        res.status(404).send({ status: "error", mensaje:"Product or cart not found!"});
    }
    
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
    console.error(error);
  }
});


export default router;