import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /expenses?month=2026-09
router.get("/", async (req, res) => {
  const { month } = req.query;

  let where = {};
  if (month && typeof month === "string") {
    const parts = month.split("-").map(Number);
    const year = parts[0];
    const monthNum = parts[1];

    if (year !== undefined && monthNum !== undefined && !isNaN(year) && !isNaN(monthNum)) {
      const start = new Date(year, monthNum - 1, 1);
      const end = new Date(year, monthNum, 1); // First day of next month
      where = { date: { gte: start, lt: end } };
    }
  }

  const expenses = await prisma.expense.findMany({
    where,
    include: { category: true },
    orderBy: { date: "desc" },
  });

  res.json(expenses);
});

// POST /expenses
router.post("/", async (req, res) => {
  const { amount, note, date, categoryId } = req.body;

  const expense = await prisma.expense.create({
    data: {
      amount,
      note,
      ...(date && { date: new Date(date) }),
      categoryId,
    },
  });

  res.status(201).json(expense);
});

// DELETE /expenses/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.expense.delete({ where: { id } });
  res.status(204).send();
});

export default router;