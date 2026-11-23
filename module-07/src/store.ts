// In-memory data. Every server start, and every test, begins from this seed.
export type Show = {
  id: string;
  name: string;
  date: string;
  doorsOpen: string;
  seats: number;
  priceCents: number;
};

const seed: Show[] = [
  {
    id: "songs-of-spring",
    name: "Songs of Spring",
    date: "2027-03-14",
    doorsOpen: "19:00",
    seats: 200,
    priceCents: 1200,
  },
];

export const store = {
  shows: new Map<string, Show>(),
};

export function resetStore(): void {
  store.shows.clear();
  for (const show of seed) {
    store.shows.set(show.id, { ...show });
  }
}

resetStore();
