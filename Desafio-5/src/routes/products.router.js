import { Router } from "express";

import {
  getProductController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/products.controllers.js";

const router = Router();


router.get("/", getProductController);
router.get("/:id",  getProductByIdController);
router.post("/", addProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;
