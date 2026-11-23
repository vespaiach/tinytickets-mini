import express from "express";
import { showsRouter } from "./routes/shows.ts";
import { ordersRouter } from "./routes/orders.ts";
import { reportsRouter } from "./routes/reports.ts";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(showsRouter);
  app.use(ordersRouter);
  app.use(reportsRouter);
  return app;
}
