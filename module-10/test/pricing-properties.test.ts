import { test } from "node:test";
import assert from "node:assert/strict";
import fc from "fast-check";
import { ticketPriceCents, quoteOrder } from "../src/sales/pricing.ts";

const ticketType = fc.constantFrom("standard", "student", "vip", "vip-student");
const line = fc.record({ type: ticketType, quantity: fc.integer({ min: 1, max: 4 }) });
const order = fc.array(line, { minLength: 1, maxLength: 3 });
const showPrice = fc.integer({ min: 100, max: 10_000 });

test("the booking fee is charged once, and only under four tickets", () => {
  fc.assert(
    fc.property(showPrice, order, (priceCents, lines) => {
      let tickets = 0;
      let unitsCents = 0;
      for (const l of lines) {
        tickets += l.quantity;
        unitsCents += ticketPriceCents(priceCents, l.type) * l.quantity;
      }
      const quote = quoteOrder(priceCents, lines);
      assert.equal(quote.totalCents - unitsCents, tickets < 4 ? 150 : 0);
    }),
  );
});
