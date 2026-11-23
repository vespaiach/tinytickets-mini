import { test } from "node:test";
import assert from "node:assert/strict";
import { ticketPriceCents, quoteOrder, type OrderLine } from "../src/sales/pricing.ts";

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

test("one VIP student ticket pays the booking fee once", () => {
  assert.deepEqual(quoteOrder(1200, [{ type: "vip-student", quantity: 1 }]), {
    ticketsCents: 1360,
    bookingFeeCents: 150,
    totalCents: 1510,
  });
});

type Case = { name: string; lines: OrderLine[]; percentOff: number; want: number };

const cases: Case[] = [
  { name: "1 standard", percentOff: 0, want: 1350, lines: [{ type: "standard", quantity: 1 }] },
  { name: "1 student", percentOff: 0, want: 1110, lines: [{ type: "student", quantity: 1 }] },
  { name: "1 vip", percentOff: 0, want: 1850, lines: [{ type: "vip", quantity: 1 }] },
  { name: "3 vip-student", percentOff: 0, want: 4230, lines: [{ type: "vip-student", quantity: 3 }] },
  { name: "4 vip-student", percentOff: 0, want: 5440, lines: [{ type: "vip-student", quantity: 4 }] },
  {
    name: "1 standard + 1 vip-student",
    percentOff: 0,
    want: 2710,
    lines: [{ type: "standard", quantity: 1 }, { type: "vip-student", quantity: 1 }],
  },
  {
    name: "2 standard + 2 vip-student",
    percentOff: 0,
    want: 5120,
    lines: [{ type: "standard", quantity: 2 }, { type: "vip-student", quantity: 2 }],
  },
  { name: "1 vip-student, 10% code", percentOff: 10, want: 1510, lines: [{ type: "vip-student", quantity: 1 }] },
];

for (const c of cases) {
  test(`order total: ${c.name}`, () => {
    assert.equal(quoteOrder(1200, c.lines, c.percentOff).totalCents, c.want);
  });
}
