import express from "express";
import { showsRouter } from "./routes/shows.ts";
import { ordersRouter } from "./routes/orders.ts";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(showsRouter);
  app.use(ordersRouter);
  return app;
}
