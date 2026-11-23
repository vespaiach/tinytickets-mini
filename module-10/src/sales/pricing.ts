import { bookingFeeCents } from "./booking-fee.ts";

export type TicketType = "standard" | "student" | "vip" | "vip-student";
export type OrderLine = { type: TicketType; quantity: number };
export type Quote = { ticketsCents: number; bookingFeeCents: number; totalCents: number };

const STUDENT_PERCENT_OFF = 20;
const VIP_EXTRA_CENTS = 500;

// Price of one ticket in cents, before the booking fee.
export function ticketPriceCents(showPriceCents: number, type: TicketType): number {
  if (type === "student") {
    return showPriceCents - Math.round((showPriceCents * STUDENT_PERCENT_OFF) / 100);
  }
  if (type === "vip") {
    return showPriceCents + VIP_EXTRA_CENTS;
  }
  if (type === "vip-student") {
    const vipCents = showPriceCents + VIP_EXTRA_CENTS;
    return vipCents - Math.round((vipCents * STUDENT_PERCENT_OFF) / 100);
  }
  return showPriceCents;
}

// Every ticket, then the booking fee once for the whole order.
export function quoteOrder(showPriceCents: number, lines: OrderLine[], percentOff = 0): Quote {
  let ticketCount = 0;
  let ticketsCents = 0;
  for (const line of lines) {
    let unitCents = ticketPriceCents(showPriceCents, line.type);
    if (line.type !== "student" && line.type !== "vip-student") {
      unitCents -= Math.round((unitCents * percentOff) / 100);
    }
    ticketsCents += unitCents * line.quantity;
    ticketCount += line.quantity;
  }
  const feeCents = bookingFeeCents(ticketCount);
  return { ticketsCents, bookingFeeCents: feeCents, totalCents: ticketsCents + feeCents };
}
