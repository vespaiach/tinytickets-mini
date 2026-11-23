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

// Quote a Songs of Spring order ($12 tickets) with a discount code.
function quote(lines: unknown[], discountCode: string) {
  return postJson(base, "/orders/quote", { showId: "songs-of-spring", lines, discountCode });
}

test("SPRING10 takes 10% off the tickets, not the booking fee", async () => {
  const r = await quote([{ type: "standard", quantity: 2 }], "SPRING10");
  assert.deepEqual(r.body, { ticketsCents: 2160, bookingFeeCents: 150, totalCents: 2310 });
});

test("a code ignores case and spaces", async () => {
  const r = await quote([{ type: "standard", quantity: 2 }], " spring10 ");
  assert.equal(r.body.totalCents, 2310);
});

test("an unknown code is a 400, not a full-price quote", async () => {
  const r = await quote([{ type: "standard", quantity: 1 }], "SPRNG10");
  assert.equal(r.status, 400);
});

test("a code does not stack with the student discount", async () => {
  const r = await quote([{ type: "student", quantity: 1 }], "SPRING10");
  assert.deepEqual(r.body, { ticketsCents: 960, bookingFeeCents: 150, totalCents: 1110 });
});

test("FRIEND5 takes 5% off a VIP ticket too", async () => {
  const r = await quote([{ type: "vip", quantity: 1 }], "FRIEND5");
  assert.deepEqual(r.body, { ticketsCents: 1615, bookingFeeCents: 150, totalCents: 1765 });
});
