# ---- Base Stage ----
# Use a slim image as a base for a smaller final image.
FROM node:20-slim AS base

# ---- Builder Stage ----
# This stage installs dependencies and builds the Next.js application.
FROM base AS builder
WORKDIR /app

COPY ./app/package*.json ./
RUN pnpm ci

COPY ./app ./

ENV NODE_ENV=production

# Add your ARGs here if your project needs them for the build process,
# especially for NEXT_PUBLIC_ variables that need to be available client-side.
# Example:
# ARG NEXT_PUBLIC_SITE_URL
# ARG DATABASE_URL
# ARG OPENAI_API_KEY

# The build command generates the optimized production build.
RUN pnpm run build

# ---- Runner Stage ----
# This is the final stage that will be used to create the production image.
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy the migration runner and install its specific dependencies.
COPY --from=builder --chown=nextjs:nodejs /app/drizzle/migrations ./drizzle/migrations
COPY --from=builder --chown=nextjs:nodejs /app/drizzle/migrate ./drizzle/migrate
RUN cd drizzle/migrate && pnpm i

COPY --chown=nextjs:nodejs ./docker/next/prod/run.sh ./run.sh
RUN chmod +x ./run.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["./run.sh"]