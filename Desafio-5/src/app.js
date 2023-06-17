
import express from "express";
import { __dirname } from "./path.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/errorHandler.js";
import "./db/db.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import productsView from "./routes/productsView.router.js"
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";

import MessagesDaoMongo from "./daos/mongodb/messages.dao.js";
const messagesManager = new MessagesDaoMongo();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(errorHandler);


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.use(
  session({
    secret: "sessionKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://Q0epJKfa:Q0epJKfa@ecommerce.caamhww.mongodb.net/Ecommerce?retryWrites=true&w=majority",
      ttl: 60
    }),
  })
);


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/messages", messagesRouter);
app.use("/products", productsView)
app.use("/users", usersRouter);
app.use("/views", viewsRouter);


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