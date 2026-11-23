import express from "express";
import { findShow } from "../repositories/show-repository.ts";
import { percentOffFor } from "../sales/discounts.ts";
import { quoteOrder, type OrderLine } from "../sales/pricing.ts";

export const ordersRouter = express.Router();

const TYPES: string[] = ["standard", "student", "vip"];

// Returns an error message, or null when every line is valid.
function checkLines(lines: unknown): string | null {
  if (!Array.isArray(lines) || lines.length === 0) {
    return "lines must be a non-empty array";
  }
  for (const line of lines) {
    if (!TYPES.includes(line?.type)) {
      return "each line needs a type: standard, student or vip";
    }
    if (!Number.isInteger(line.quantity) || line.quantity < 1) {
      return "each line needs a whole quantity of at least 1";
    }
  }
  return null;
}

ordersRouter.post("/orders/quote", (req, res) => {
  const { showId, lines, discountCode } = req.body ?? {};
  const show = findShow(showId);
  if (!show) {
    res.status(404).json({ error: "unknown show" });
    return;
  }
  const problem = checkLines(lines);
  if (problem) {
    res.status(400).json({ error: problem });
    return;
  }
  const percentOff = percentOffFor(discountCode);
  if (percentOff === null) {
    res.status(400).json({ error: "unknown discount code" });
    return;
  }
  res.json(quoteOrder(show.priceCents, lines as OrderLine[], percentOff));
});
