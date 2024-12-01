import express from "express";
import { productsRouter } from "./router";

const server = express();

// Routing
server.use("/api/products", productsRouter);

export default server;
