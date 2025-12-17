import { defineConfig } from 'drizzle-kit';
import { env } from './src/config/env';

export default defineConfig({
    schema: './src/server/db/schema/index.ts',
    dialect: 'postgresql',
    out: './drizzle',
    dbCredentials: {
        url: env.DATABASE_URL
    },
    verbose: true,
    strict: true
});
