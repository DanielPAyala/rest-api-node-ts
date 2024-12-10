import express from "express";
import colors from "colors";
import swaggerUI from "swagger-ui-express";
import { productsRouter } from "./router";
import { db } from "./config/db";
import { swaggerSpec, swaggerUiOptions } from "./config/swagger";

// Connect to the database
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(
    //   colors.blue.bold("Conexión a la base de datos establecida correctamente.")
    // );
  } catch (error) {
    console.error(colors.red.bold("Error al conectar a la base de datos."));
  }
}
connectDB();

// Instancia de express
const server = express();

// Middleware
server.use(express.json());

// Routing
server.use("/api/products", productsRouter);
server.get("/api", (req, res) => {
  res.json({ message: "API is working" });
});

// Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions));

export { server };
