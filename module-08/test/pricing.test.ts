import { test } from "node:test";
import assert from "node:assert/strict";
import { ticketPriceCents, quoteOrder, comboTotalCents } from "../src/sales/pricing.ts";

test("ticket prices for a $12 show", () => {
  assert.equal(ticketPriceCents(1200, "standard"), 1200);
  assert.equal(ticketPriceCents(1200, "student"), 960);
  assert.equal(ticketPriceCents(1200, "vip"), 1700);
});

test("two standard tickets pay the booking fee once", () => {
  assert.deepEqual(quoteOrder(1200, [{ type: "standard", quantity: 2 }]), {
    ticketsCents: 2400,
    bookingFeeCents: 150,
    totalCents: 2550,
  });
});

test("four tickets in two lines pay no booking fee", () => {
  const quote = quoteOrder(1200, [
    { type: "student", quantity: 2 },
    { type: "vip", quantity: 2 },
  ]);
  assert.deepEqual(quote, { ticketsCents: 5320, bookingFeeCents: 0, totalCents: 5320 });
});

test("VIP student combo", () => {
  assert.equal(comboTotalCents(1200, 1), 1510);
  assert.equal(comboTotalCents(1200, 4), 5440);
});
