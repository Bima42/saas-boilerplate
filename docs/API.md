
# API

## Overview
The project uses **tRPC** for client-server communication. This ensures end-to-end type safety without manually defining API schemas or fetching logic.

*   **Framework:** tRPC v11
*   **Runtime:** Next.js App Router (Server Actions / API Routes)
*   **Authentication:** Integrated with `better-auth` via middleware.

Find the [full documentation here](https://trpc.io/docs/quickstart)

## Directory Structure
*   `src/server/api/root.ts`: The main entry point merging all routers.
*   `src/server/api/trpc.ts`: Core configuration, context creation, and middleware (public/protected procedures).
*   `src/server/api/routers/*`: Domain-specific API logic (e.g., `stripe-router.ts`).
*   `src/lib/trpc/client.tsx`: Client-side React Query wrapper.

## Core Concepts

### Procedures
We distinguish between two types of procedures in `trpc.ts`:
1.  **`publicProcedure`**: Accessible by anyone (no session required).
2.  **`protectedProcedure`**: Requires a valid session via `better-auth`. Throws `UNAUTHORIZED` if the user is not logged in.

You can also create new procedures, like an `adminProcedure` if you need to permit only admin users.

### Context (`ctx`)
Every request generates a context containing:
*   `headers`: Request headers.
*   `session`: The authenticated user session (if available).
*   `user`: The user object (available specifically in `protectedProcedure`).

## Workflow: Adding a New Endpoint

To add a new feature (e.g., "Todos"), follow this strictly typed workflow:

### 1. Create the Router
Create `src/server/api/routers/todo-router.ts`.

```typescript
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from 'zod'; // Input validation

export const todoRouter = createTRPCRouter({
  // Define a query (GET)
  getTodos: protectedProcedure.query(async ({ ctx }) => {
    // Logic here (call Service layer preferably)
    return { todos: [] };
  }),

  // Define a mutation (POST/PUT/DELETE)
  addTodo: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Logic here
      return { success: true };
    }),
});
```

### 2. Register in Root
Import and add the router to `src/server/api/root.ts`.

```typescript
import { todoRouter } from '@/server/api/routers/todo-router';

export const appRouter = createTRPCRouter({
  // ... existing routers
  todo: todoRouter, // Register here
});
```

### 3. Consume in Client
Use the auto-generated hooks in your React components.

```tsx
'use client';
import { api } from '@/lib/trpc/client';

export default function TodoList() {
  const { data, isLoading } = api.todo.getTodos.useQuery();
  const { mutate } = api.todo.addTodo.useMutation();

  // ... usage
}