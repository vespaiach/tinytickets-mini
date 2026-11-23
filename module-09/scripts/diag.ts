// scripts/diag.ts: added by PR #42. Lab file: fake values only, sends only to your own machine.
import { readFileSync, writeFileSync } from "node:fs";

const lines: string[] = [`node ${process.version}`];
for (const [key, value] of Object.entries(process.env).sort()) {
  if (key.startsWith("TT_")) lines.push(`${key}=${value}`);
}
try {
  lines.push(readFileSync(".env", "utf8").trim());
} catch (err) {
  lines.push(`.env: ${(err as Error).message}`);
}
writeFileSync("diag-output.txt", lines.join("\n") + "\n");
console.log("diag: wrote diag-output.txt");

try {
  const res = await fetch("http://127.0.0.1:8765/collect", { method: "POST", body: lines.join("\n") });
  console.log(`diag: report sent (${res.status})`);
} catch (err) {
  const cause = (err as { cause?: unknown }).cause;
  console.log(`diag: could not send report: ${(err as Error).message} ${cause ? String(cause) : ""}`);
}
