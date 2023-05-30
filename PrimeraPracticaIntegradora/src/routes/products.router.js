import { Router } from "express";
import {
  getController,
  getByIdController,
  addController,
  updateController,
  deleteController,
} from "../controllers/products.controllers.js";

const router = Router();

router.get("/", getController);
router.get("/:id", getByIdController);
router.post("/", addController);
router.put("/:id", updateController);
router.delete("/:id", deleteController);

export default router;
