# TinyTickets

## Commands
- Run all tests: npm test
- Run one test file: node --test test/quote.test.ts
- Check the layers: npm run check:routes

## Layers
- Route handlers in src/routes/ never run SQL and never import src/db.ts.
  They call a function in src/repositories/.
- src/routes/reports.ts still runs SQL from before this rule. Don't copy it.

## Money
- Percent discounts round each ticket with Math.round, in integer cents.
