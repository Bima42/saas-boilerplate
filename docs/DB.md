# Database and ORM

## Overview
The project uses **PostgreSQL** as the database and **Drizzle ORM** for schema definition, type-safe queries, and migrations.

*   **ORM:** Drizzle ORM
*   **Driver:** `postgres` (Postgres.js)
*   **Migration Tool:** Drizzle Kit
*   **Location:** `src/server/db`

## Directory Structure
*   `src/server/db/schema/*`: Individual schema files (split by domain).
*   `src/server/db/index.ts`: Database connection initialization.
*   `src/server/services/*`: **Service Layer**. Abstraction logic to interact with the DB. **Avoid calling database directly from API routers; use services.**

## Schema Definition
Schemas are defined in TypeScript. We use `snake_case` for database columns and `camelCase` for TypeScript keys.

**Example Pattern (`src/server/db/schema/example.ts`):**
```typescript
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const exampleTable = pgTable('example_table', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

## Migration Workflow

We use a strictly controlled migration process.

### 1. Modify Schema
Edit or create files in `src/server/db/schema/`. Ensure you export new tables in `src/server/db/schema/index.ts`.

### 2. Generate Migration File
Analyze the schema changes and generate a SQL file.
```bash
npm run db:generate
```
*Output: Creates a new SQL file in `./drizzle` folder.*

### 3. Apply Changes
Apply the migration to the connected database.

**For Local Development (Quick):**
```bash
npm run db:push
```
*Note: `db:push` syncs schema state directly. Useful for prototyping.*

**For Production/Staging (Strict):**
```bash
npm run db:migrate
```
*Note: Runs the generated SQL files using `src/server/db/migrate.ts`.*

## Service Layer Pattern
To maintain clean code, API routers should not contain raw DB queries. Create a service function instead.

**File: `src/server/services/user.ts`**
```typescript
import { db } from '@/server/db';
import { user } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const getUserById = async (id: string) => {
  return await db.query.user.findFirst({
    where: eq(user.id, id),
  });
};
```