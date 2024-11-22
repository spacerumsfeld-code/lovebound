import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
// import { Resource } from "sst";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql);
