
import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://Q0epJKfa:Q0epJKfa@ecommerce.caamhww.mongodb.net/Ecommerce?retryWrites=true&w=majority";

try {
  await mongoose.connect(connectionString);
  console.log("Conectado a la base de datos MongoDB");
} catch (error) {
  console.log(error);
}
