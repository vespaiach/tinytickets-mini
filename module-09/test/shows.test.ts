import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:http";
import { start } from "./helpers.ts";

let server: Server;
let base = "";

before(async () => {
  ({ server, base } = await start());
});

after(() => {
  server.close();
});

test("GET /shows/:id returns one show", async () => {
  const res = await fetch(base + "/shows/songs-of-spring");
  assert.equal(res.status, 200);
  const show = await res.json();
  assert.equal(show.priceCents, 1200);
});

test("an unknown show id is a 404", async () => {
  const res = await fetch(base + "/shows/nope");
  assert.equal(res.status, 404);
});
