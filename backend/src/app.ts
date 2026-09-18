import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import settingsRoutes from "./routes/settings";
import categoriesRoutes from "./routes/categories";
import expensesRoutes from "./routes/expenses";
import statsRoutes from "./routes/stats";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/settings", settingsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/expenses", expensesRoutes);
app.use("/stats", statsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});