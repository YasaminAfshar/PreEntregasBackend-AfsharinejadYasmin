import { Router } from "express";
import {
  getCartsController,
  getCartByIdController,
  createCartController,
  addProductToCartController,
  deleteProductToCartController,
  deleteProductFromCartController,
} from "../controllers/carts.controllers.js";

const router = Router();

router.get("/", getCartsController);
router.get("/:cid", getCartByIdController);
router.post("/", createCartController);
router.post("/:cid/product/:pid", addProductToCartController);
router.delete("/:cid", deleteProductToCartController);
router.delete("/:cid/product/:pid", deleteProductFromCartController);


export default router;
