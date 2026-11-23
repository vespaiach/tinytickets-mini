import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:http";
import { start, postJson } from "./helpers.ts";

let server: Server;
let base = "";

before(async () => {
  ({ server, base } = await start());
});

after(() => {
  server.close();
});

test("one standard ticket pays the booking fee", async () => {
  const r = await postJson(base, "/orders/quote", {
    showId: "songs-of-spring",
    lines: [{ type: "standard", quantity: 1 }],
  });
  assert.equal(r.status, 200);
  assert.deepEqual(r.body, { ticketsCents: 1200, bookingFeeCents: 150, totalCents: 1350 });
});

test("an unknown show is a 404", async () => {
  const r = await postJson(base, "/orders/quote", {
    showId: "nope",
    lines: [{ type: "standard", quantity: 1 }],
  });
  assert.equal(r.status, 404);
});

test("a quantity of zero is a 400", async () => {
  const r = await postJson(base, "/orders/quote", {
    showId: "songs-of-spring",
    lines: [{ type: "standard", quantity: 0 }],
  });
  assert.equal(r.status, 400);
});
