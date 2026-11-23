import express from "express";
import { listShows, findShow } from "../repositories/show-repository.ts";

export const showsRouter = express.Router();

// The show list rarely changes, so GET /shows keeps it for 30 seconds
// instead of rebuilding it on every request.
const SHOWS_CACHE_MS = 30_000;
let cachedShows: ReturnType<typeof listShows> | null = null;
let cachedAt = 0;

showsRouter.get("/shows", (_req, res) => {
  const now = Date.now();
  if (cachedShows === null || now - cachedAt >= SHOWS_CACHE_MS) {
    cachedShows = listShows();
    cachedAt = now;
  }
  res.json(cachedShows);
});

showsRouter.get("/shows/:id", (req, res) => {
  const show = findShow(req.params.id);
  if (!show) {
    res.status(404).json({ error: "unknown show" });
    return;
  }
  res.json(show);
});
