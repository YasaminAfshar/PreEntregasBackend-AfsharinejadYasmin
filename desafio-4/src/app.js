
//Se realizan las importaciones de archivos:

import express from "express";
import productsRouter from "./Routes/products.routes.js";
import cartsRouter from "./Routes/carts.routes.js";
import { __dirname } from "./path.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public/images"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server en puerto ${PORT} todo OK`);
});

