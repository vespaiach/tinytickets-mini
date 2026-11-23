import { store, type Show } from "../store.ts";

export function listShows(): Show[] {
  return [...store.shows.values()];
}

export function findShow(id: string): Show | undefined {
  return store.shows.get(id);
}
