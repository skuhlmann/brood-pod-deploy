const { DATABASE_URI } = process.env;
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: DATABASE_URI!,
  },
  verbose: true,
  strict: true,
});