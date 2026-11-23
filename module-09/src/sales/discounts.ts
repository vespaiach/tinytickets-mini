// Percent off for each discount code.
const CODES = new Map<string, number>([
  ["SPRING10", 10],
  ["FRIEND5", 5],
]);

// The percent off for a discountCode field from a request.
// A missing or blank code is 0. An unknown code is null.
export function percentOffFor(code: unknown): number | null {
  if (code === undefined || code === null) {
    return 0;
  }
  if (typeof code !== "string") {
    return null;
  }
  const key = code.trim().toUpperCase();
  if (key === "") {
    return 0;
  }
  return CODES.get(key) ?? null;
}
