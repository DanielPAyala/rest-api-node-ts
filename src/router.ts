import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct
} from "./handlers/product";
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

router.put(
  "/:id",
  param("id").isNumeric().withMessage("ID no válido"),
  // Validación de los datos
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("price")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0"),
  body("availability")
    .isBoolean()
    .withMessage("La disponibilidad no es válida"),
  handleInputErrors,
  updateProduct
);

router.delete(
  "/:id",
  param("id").isNumeric().withMessage("ID no válido"),
  handleInputErrors,
  deleteProduct
);

router.patch(
  "/:id",
  param("id").isNumeric().withMessage("ID no válido"),
  handleInputErrors,
  updateAvailability
);

export { router as productsRouter };
