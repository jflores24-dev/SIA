import envs from "../config/envs.js";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(envs.POSTGRES_URL);
