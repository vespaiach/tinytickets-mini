import { once } from "node:events";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { createApp } from "../src/app.ts";
import { resetStore } from "../src/store.ts";

// Starts the app on a free port, from a fresh copy of the seed data.
export async function start(): Promise<{ server: Server; base: string }> {
  resetStore();
  const server = createApp().listen(0);
  await once(server, "listening");
  const { port } = server.address() as AddressInfo;
  return { server, base: `http://127.0.0.1:${port}` };
}

// Sends a JSON POST and returns the status and the parsed body.
export async function postJson(base: string, path: string, body: unknown) {
  const res = await fetch(base + path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, body: await res.json() };
}
