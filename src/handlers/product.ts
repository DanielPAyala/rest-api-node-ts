import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [["id", "ASC"]],
    attributes: { exclude: ["createdAt", "updatedAt", "availability"] }
  });
  res.json({ data: products });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json({ data: product });
  } else {
    res.status(404).json({ error: "Producto no encontrado." });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({ error: "Producto no encontrado." });
    return;
  }

  // Actualizar el producto
  await product.update(req.body);
  await product.save();
  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({ error: "Producto no encontrado." });
    return;
  }

  // Eliminar el producto
  await product.destroy();
  res.json({ data: "Producto Eliminado." });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({ error: "Producto no encontrado." });
    return;
  }

  // Actualizar la disponibilidad
  product.availability = !product.dataValues.availability;
  await product.save();
  res.json({ data: product });
};
