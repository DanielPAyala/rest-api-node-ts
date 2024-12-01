import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "From GET" });
});

router.post("/", (req, res) => {
  res.json({ message: "From POST" });
});

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
