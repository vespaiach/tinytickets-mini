// In-memory data. Every server start, and every test, begins from this seed.
export type Show = {
  id: string;
  name: string;
  date: string;
  doorsOpen: string;
  seats: number;
  priceCents: number;
  organizerId: string;
};

export type Order = {
  id: string;
  showId: string;
  buyerName: string;
  buyerEmail: string;
  ticketsCents: number;
  bookingFeeCents: number;
  totalCents: number;
  status: "paid" | "refunded";
  refundedCents: number;
};

const seed: Show[] = [
  {
    id: "songs-of-spring",
    name: "Songs of Spring",
    date: "2027-03-14",
    doorsOpen: "19:00",
    seats: 200,
    priceCents: 1200,
    organizerId: "org-leo",
  },
  {
    id: "late-jazz",
    name: "Late Jazz",
    date: "2027-04-09",
    doorsOpen: "21:00",
    seats: 120,
    priceCents: 2000,
    organizerId: "org-other",
  },
];

// What each buyer paid when they ordered. Ana's name holds HTML on purpose.
const seedOrders: Order[] = [
  {
    id: "o1",
    showId: "songs-of-spring",
    buyerName: "Kim",
    buyerEmail: "kim@example.com",
    ticketsCents: 2400, // 2 standard tickets
    bookingFeeCents: 150,
    totalCents: 2550,
    status: "paid",
    refundedCents: 0,
  },
  {
    id: "o2",
    showId: "songs-of-spring",
    buyerName: "<b>Ana</b>",
    buyerEmail: "ana@example.com",
    ticketsCents: 1360, // 1 VIP student ticket
    bookingFeeCents: 150,
    totalCents: 1510,
    status: "paid",
    refundedCents: 0,
  },
  {
    id: "o3",
    showId: "late-jazz",
    buyerName: "Sam",
    buyerEmail: "sam@example.com",
    ticketsCents: 2000, // 1 standard ticket
    bookingFeeCents: 150,
    totalCents: 2150,
    status: "paid",
    refundedCents: 0,
  },
];

export const store = {
  shows: new Map<string, Show>(),
  orders: new Map<string, Order>(),
};

export function resetStore(): void {
  store.shows.clear();
  for (const show of seed) {
    store.shows.set(show.id, { ...show });
  }
  store.orders.clear();
  for (const order of seedOrders) {
    store.orders.set(order.id, { ...order });
  }
}

resetStore();
