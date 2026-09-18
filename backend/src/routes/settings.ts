import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /settings
router.get("/", async (req, res) => {
  const settings = await prisma.budgetSettings.findFirst();
  res.json(settings);
});

// PUT /settings
router.put("/", async (req, res) => {
  const { bankBalance, monthlyBudget } = req.body;

  const existing = await prisma.budgetSettings.findFirst();

  const settings = existing
    ? await prisma.budgetSettings.update({
        where: { id: existing.id },
        data: { bankBalance, monthlyBudget },
      })
    : await prisma.budgetSettings.create({
        data: { bankBalance, monthlyBudget },
      });

  res.json(settings);
});

export default router;