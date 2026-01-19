# Payload CMS

## Overview
The project integrates **Payload CMS 3.0**. It allows for a "Code-First" CMS approach where the admin panel and API are generated from TypeScript config files.

*   **Config:** `src/payload.config.ts`
*   **Admin Route:** `/admin`
*   **Database:** Shares the same PostgreSQL instance as the main app but manages its own tables/migrations via the Payload Adapter.

## Directory Structure
*   `src/payload.config.ts`: Main configuration (db connection, plugins, collections).
*   `src/payload_collections/*`: Definition of content structures (Collections).
*   `src/payload-types.ts`: **Auto-generated** TypeScript interfaces for your collections.

## Core Concepts

### Collections
A Collection represents a table in the database (e.g., `posts`, `media`). It defines fields, access control, and hooks.

Find lot more in the [Payload Collections Docs](https://payloadcms.com/docs/configuration/collections).

### Access Control
Payload has a powerful access control system.
*   `read`: Who can see this data?
*   `update`: Who can edit this data?
*   Defined as functions returning `boolean` or a `query` constraint.

## Workflow: Adding a Collection

### 1. Define the Collection
Create `src/payload_collections/example.ts`.

```typescript
import { CollectionConfig } from 'payload';

export const Example: CollectionConfig = {
  slug: 'examples', // URL slug and DB table name
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: ['news', 'update'],
    }
  ],
};
```

### 2. Register in Config
Import the collection in `src/payload.config.ts`.

```typescript
import { Example } from '@/payload_collections/example';

export default buildConfig({
  // ...
  collections: [
    Media,
    Post,
    Example, // Add here
  ],
  // ...
});
```

### 3. Type Generation
Payload automatically generates types when the dev server is running. If types are missing, restart the server or check `src/payload-types.ts`.

### 4. Migrations (Payload Specific)
Payload manages its own internal migrations separately from Drizzle.
*   Migrations are stored in `src/payload_migrations`.
*   The dev entrypoint runs migrations automatically on startup.
*   If `push: false` is set in config, you must run Payload migration commands manually.

There is 2 main commands to know:
- `docker compose exec app npx payload migrate:create` || `npm run payload:create` : Creates a new migration file.
- `docker compose exec app npx payload migrate` || `npm run payload:create` : Applies all pending migrations.

But you can find more about it in the [Payload Migrations Docs](https://payloadcms.com/docs/database/migrations).

## Reach the panel
Once everything is set up, you can reach the admin panel at `http://localhost:3000/admin` and log in with the admin credentials you set during the initial setup.