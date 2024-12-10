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

/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      id:
 *       type: integer
 *       description: Product ID
 *       example: 1
 *      name:
 *       type: string
 *       description: Product name
 *       example: "Monitor Curvo de 49 pulgadas"
 *      price:
 *       type: number
 *       description: Product price
 *       example: 1000
 *      availability:
 *       type: boolean
 *       description: Product availability
 *       example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get all products
 *    description: Retrieve a list of products
 *    tags:
 *      - Products
 *    responses:
 *      200:
 *        description: Successfull response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *     - Products
 *    description: Retrieve a product by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the product to retrieve
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successfull response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad request - Invalid ID
 */
router.get(
  "/:id",
  param("id").isNumeric().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: Create a new product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Product name
 *                example: "Monitor Curvo de 49 pulgadas"
 *              price:
 *                type: number
 *                description: Product price
 *                example: 1000
 *    responses:
 *      201:
 *        description: Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: Product ID
 *                  example: 1
 *                name:
 *                  type: string
 *                  description: Product name
 *                  example: "Monitor Curvo de 49 pulgadas"
 *                price:
 *                  type: number
 *                  description: Product price
 *                  example: 1000
 *                availability:
 *                  type: boolean
 *                  description: Product availability
 *                  example: true
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                  description: Product creation date
 *                  example: "2021-09-01T00:00:00.000Z"
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                  description: Product update date
 *                  example: "2021-09-01T00:00:00.000Z"
 *      400:
 *        description: Bad request - Invalid input data
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product with user input
 *    tags:
 *      - Products
 *    description: Update a product with user input
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the product to update
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Product name
 *                example: "Monitor Curvo de 49 pulgadas"
 *              price:
 *                type: number
 *                description: Product price
 *                example: 1000
 *              availability:
 *                type: boolean
 *                description: Product availability
 *                example: true
 *    responses:
 *      200:
 *        description: Product updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid input data - Invalid ID
 *      404:
 *        description: Product not found
 */
router.put(
  "/:id",
  param("id").isNumeric().withMessage("ID no válido"),
  // Validación de los datos
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("price")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0"),
  body("availability")
    .isBoolean()
    .withMessage("La disponibilidad no es válida"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product by ID
 *    tags:
 *      - Products
 *    description: Delete a product by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the product to delete
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Product deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: "Producto Eliminado."
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 */
router.delete(
  "/:id",
  param("id").isNumeric().withMessage("ID no válido"),
  handleInputErrors,
  deleteProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update availability of a product
 *    tags:
 *      - Products
 *    description: Update availability of a product
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the product to update
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Product availability updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 */
router.patch(
  "/:id",
  param("id").isNumeric().withMessage("ID no válido"),
  handleInputErrors,
  updateAvailability
);

export { router as productsRouter };
