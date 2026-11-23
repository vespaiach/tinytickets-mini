// An order of fewer than four tickets pays a $1.50 booking fee.
export function bookingFeeCents(ticketCount: number): number {
  return ticketCount < 4 ? 150 : 0;
}
