import pg from "pg";

// A PostgreSQL pool when DATABASE_URL is set. Without it, pool is null
// and the app runs on the in-memory store.
export const pool = process.env.DATABASE_URL
  ? new pg.Pool({ connectionString: process.env.DATABASE_URL })
  : null;
