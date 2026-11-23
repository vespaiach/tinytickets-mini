# tinytickets-mini

The sample repo for Modules 6 to 10 of the Stay Online course "Software 3.0 and Agentic Engineering". It's TinyTickets, the course's small ticket-selling app, written with Express and TypeScript.

Each folder is a complete copy of the app, with its own `package.json`. It holds the starting state of one module's lab:

- `module-06/`: shows, ticket prices and order quotes, 8 tests. You add discount codes twice, vibe coded and engineered.
- `module-07/`: Module 6's finished app, plus a PostgreSQL pool and one old route that runs SQL itself, 13 tests. You teach the agent the layer rule.
- `module-08/`: Module 7's finished app, with `AGENTS.md`, a skill, a hook and permission rules, 15 tests. You review an agent's change.
- `module-09/`: Module 8's finished app, with VIP student tickets and locked tests, 25 tests. You review a pull request from outside the team.
- `module-10/`: Module 9's app, plus organizers, orders and an email outbox, 25 tests. You build refunds with several agents.

Two branches hold what a lab reviews:

- `agent/vip-student`: an agent's change to `module-08/`, for Module 8.
- `pr-42-faster-shows`: an outside pull request to `module-09/`, for Module 9.

## Run a folder

You need Git and Node.js 26 LTS. Node runs the `.ts` files directly, so there's no build step.

```bash
cd module-06
npm install
npm test
```

Use the folder of the module you're on, `module-06` to `module-10`. `npm start` runs the app on port 3000.

## Fake values only

Every name, email, price and key in this repo is made up. Nothing here sends data off your machine. Never put a real key in a folder you use for these labs.
