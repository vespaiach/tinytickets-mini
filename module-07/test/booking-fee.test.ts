import { test } from "node:test";
import assert from "node:assert/strict";
import { bookingFeeCents } from "../src/sales/booking-fee.ts";

test("fewer than four tickets pay the fee", () => {
  assert.equal(bookingFeeCents(3), 150);
});

test("four tickets pay no fee", () => {
  assert.equal(bookingFeeCents(4), 0);
});
