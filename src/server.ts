import express from "express";
import { productsRouter } from "./router";
import { db } from "./config/db";

// Connect to the database
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}
connectDB();

const server = express();

// Routing
server.use("/api/products", productsRouter);

export { server };
