import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /categories
router.get("/", async (_req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

// POST /categories
router.post("/", async (req, res) => {
  try {
    const { name, icon, color } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const category = await prisma.category.create({
      data: { name, icon, color },
    });

    return res.status(201).json(category);
  } catch (error: any) {
    // Handling Prisma unique constraint error (P2002)
    if (error.code === "P2002") {
      return res.status(409).json({ error: "A category with this name already exists" });
    }

    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;