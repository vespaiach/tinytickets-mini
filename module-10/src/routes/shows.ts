import express from "express";
import { listShows, findShow } from "../repositories/show-repository.ts";

export const showsRouter = express.Router();

showsRouter.get("/shows", (_req, res) => {
  res.json(listShows());
});

showsRouter.get("/shows/:id", (req, res) => {
  const show = findShow(req.params.id);
  if (!show) {
    res.status(404).json({ error: "unknown show" });
    return;
  }
  res.json(show);
});
