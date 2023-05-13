
//Se realizan las importaciones de archivos:

import express from "express";
import handlebars from "express-handlebars";
//import productsRouter from "./Routes/products.routes.js";
//import cartsRouter from "./Routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import ProductManager from "./Managers/ProductManager.js";
import { Server } from "socket.io";

import { __dirname } from "./path.js";


const app = express();
const productManager = new ProductManager();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


//app.use("/api/products", productsRouter);
//app.use("/api/carts", cartsRouter);

app.use("/", viewsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT} successfully`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("¡🟢 New connection!");
  socket.on("disconnect", () => {
    console.log("¡🔴 User disconnect!");
  });
  socket.on("newProduct", async (product) => {
    await productManager.addProduct(
      product.title,
      product.description,
      product.price,
      product.code,
      product.category,
      product.stock,
      product.thumbnails
    );
    const products = await productManager.getProducts();
    socketServer.emit("getProducts", products);
  });
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    const products = await productManager.getProducts();
    socketServer.emit("deleteProduct", id);
    socketServer.emit("getProducts", products);
  });
});