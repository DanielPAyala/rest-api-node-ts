import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProductById, getProducts } from "./handlers/product";
import { handleInputErrors } from "./middlewares";

const router = Router();

router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isNumeric().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

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
