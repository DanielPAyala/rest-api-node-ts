import express from "express";
import colors from "colors";
import { productsRouter } from "./router";
import { db } from "./config/db";

// Connect to the database
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(
      colors.blue.bold(
        "Conexión a la base de datos establecida correctamente."
      )
    );
  } catch (error) {
    console.error(colors.red.bold("Error al conectar a la base de datos."));
  }
}
connectDB();

const server = express();

// Routing
server.use("/api/products", productsRouter);

export { server };
