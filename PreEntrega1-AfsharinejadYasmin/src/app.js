
//Se realizan las importaciones de archivos:

import express from "express";
import productsRouter from "./Routes/products.routes.js";
import cartsRouter from "./Routes/carts.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server en puerto ${PORT} todo OK`);
});

