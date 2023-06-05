
import express from "express";
import { __dirname } from "./path.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/errorHandler.js";
import "./db/db.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import viewProducts from "./routes/viewProducts.router.js";

import MessagesDaoMongo from "./daos/mongodb/messages.dao.js";
const messagesManager = new MessagesDaoMongo();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(errorHandler);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/messages", messagesRouter);

app.use("/products", viewProducts);

const httpServer = app.listen(PORT, () => {
  console.log("🚀 Server listening on port 8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("¡🟢 New connection!", socket.id);

  socketServer.emit("messages", await messagesManager.getAllMessages());

  socket.on("disconnect", () => {
    console.log("¡🔴 User disconnect!");
  });

  socket.on("newUser", (userName) => {
    console.log(`${userName} is logged in`);
  });

  socket.on("chat:message", async ({ userName, message }) => {
    await messagesManager.createMessage(userName, message);
    socketServer.emit("messages", await messagesManager.getAllMessages());
  });

  socket.on("newUser", (userName) => {
    socket.broadcast.emit("newUser", userName);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });

});