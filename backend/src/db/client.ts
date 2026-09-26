import envs from "../config/envs.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: envs.POSTGRES_URL,
});

const db = drizzle({
  client: pool,
});

export default db;
