import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
const { DATABASE_URI } = process.env;

// This will run migrations on the database, skipping the ones already applied
async function run() {
  console.log(`Running SQL migrations...`)
  const migrationClient = postgres(DATABASE_URI!, { max: 1 });
  await migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' });
  console.log('\n✅ Done.\n')
  await migrationClient.end()
}

run()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  });