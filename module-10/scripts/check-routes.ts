// Fails when a file in src/routes/ talks to the database directly.
// Run it yourself (npm run check:routes) or from a Claude Code hook.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const routesDir = join(root, "src", "routes");

// Old files that still hold SQL. Don't add to this list: shrink it.
const legacy = new Set(["src/routes/reports.ts"]);

const rules = [
  { what: "an SQL statement", pattern: /\b(SELECT\s[^;`'"]{1,200}?\sFROM|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM)\b/g },
  { what: "an import of src/db.ts", pattern: /from\s+["'][^"']*\/db(\.ts)?["']/g },
  { what: "a .query() call", pattern: /\.query\s*\(/g },
];

const problems: string[] = [];
for (const name of readdirSync(routesDir, { recursive: true })) {
  const file = "src/routes/" + String(name).replaceAll("\\", "/");
  if (!file.endsWith(".ts") || legacy.has(file)) continue;
  const text = readFileSync(join(root, file), "utf8");
  for (const rule of rules) {
    for (const match of text.matchAll(rule.pattern)) {
      const line = text.slice(0, match.index).split("\n").length;
      problems.push(`${file}:${line}: ${rule.what} in a route handler`);
    }
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  console.error(
    "Route handlers must not touch the database. " +
      "Move the query into a function in src/repositories/ and call that function from the route.",
  );
  process.exit(2); // 2 = Claude Code shows this message to Claude
}
