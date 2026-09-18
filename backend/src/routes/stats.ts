import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /stats/summary
router.get("/summary", async (req, res) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const settings = await prisma.budgetSettings.findFirst();
  const expenses = await prisma.expense.findMany({
    where: { date: { gte: start, lt: end } },
    include: { category: true },
  });

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const monthlyBudget = settings?.monthlyBudget ?? 0;

  const byCategory: Record<string, number> = {};
  for (const e of expenses) {
    byCategory[e.category.name] = (byCategory[e.category.name] || 0) + e.amount;
  }

  res.json({
    totalSpent,
    remainingBudget: monthlyBudget - totalSpent,
    spendByCategory: byCategory,
  });
});

export default router;