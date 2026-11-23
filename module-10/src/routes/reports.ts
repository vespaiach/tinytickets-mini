// Written before the team's layer rule. Needs DATABASE_URL.
import express from "express";
import { pool } from "../db.ts";

export const reportsRouter = express.Router();

reportsRouter.get("/reports/sales", async (_req, res) => {
  if (!pool) {
    res.status(503).json({ error: "reports need DATABASE_URL" });
    return;
  }
  const result = await pool.query(
    "SELECT show_id, count(*) AS tickets FROM tickets GROUP BY show_id",
  );
  res.json(result.rows);
});
