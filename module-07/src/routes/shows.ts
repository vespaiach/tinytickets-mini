import express from "express";
import { listShows } from "../repositories/show-repository.ts";

export const showsRouter = express.Router();

showsRouter.get("/shows", (_req, res) => {
  res.json(listShows());
});
