import { store, type Order } from "../store.ts";

export function findOrder(id: string): Order | undefined {
  return store.orders.get(id);
}
