import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from '@/config/env';

async function runMigrations() {
    const databaseUrl = env.DATABASE_URL;

    console.log('Connecting to database...');
    const connection = postgres(databaseUrl, { max: 1 });
    const db = drizzle(connection);

    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });

    console.log('Migrations complete!');
    await connection.end();
}

runMigrations()
    .then(() => {
        console.log('Migration process finished successfully');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Migration failed:', err);
        process.exit(1);
    });
