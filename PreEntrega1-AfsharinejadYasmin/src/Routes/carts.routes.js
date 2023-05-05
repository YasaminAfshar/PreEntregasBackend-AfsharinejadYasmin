
import { Router } from "express";
import CartManager from "../Managers/CartManager.js";


const router = Router();
const cartManager = new CartManager("./cart.json");

router.get("/", async (req, res) => {

})



export default router;