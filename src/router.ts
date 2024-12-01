import { Router } from "express";
import { body } from "express-validator";
import { createProduct } from "./handlers/product";
import { handleInputErrors } from "./middlewares";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "From GET" });
});

router.post(
  "/",
  // Validación de los datos
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("price")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0"),
  handleInputErrors,
  createProduct
);

router.put("/", (req, res) => {
  res.json({ message: "From PUT" });
});

router.delete("/", (req, res) => {
  res.json({ message: "From DELETE" });
});

router.patch("/", (req, res) => {
  res.json({ message: "From PATCH" });
});

export { router as productsRouter };
