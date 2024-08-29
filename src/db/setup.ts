import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
const { DATABASE_URI } = process.env;

// for query purposes
const queryClient = postgres(DATABASE_URI!, { max: 1 });
export const db = drizzle(queryClient);