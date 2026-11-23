---
name: add-route
description: Adds an HTTP route to TinyTickets with its repository function and a test. Use when asked to add an endpoint, a route or an API.
---

# Add a route

1. Write a failing test in test/<area>.test.ts with node:test, using
   start() from test/helpers.ts. Run it and see it fail.
2. If the route needs data that no repository function returns yet, add a
   function to src/repositories/<area>-repository.ts. All data access lives there.
3. Write the handler in src/routes/<area>.ts, on the router <area>Router.
   It checks the input (400), calls the repository (404 when nothing is
   found), and never imports src/db.ts.
4. If the router is new, mount it in src/app.ts.
5. Run npm test and npm run check:routes. Both must pass before you finish.
