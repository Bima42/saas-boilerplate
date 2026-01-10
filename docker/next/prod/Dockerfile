FROM node:20-slim AS base

# ---- Builder Stage ----
FROM base AS builder
WORKDIR /app

COPY ./app/package*.json ./
RUN npm ci

COPY ./app ./

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

ENV SKIP_ENV_VALIDATION=1
ENV NODE_ENV=production

RUN npm run build

# Compile migration script to standalone JS
RUN npx esbuild src/server/db/migrate.ts \
    --bundle \
    --platform=node \
    --outfile=migrate.js

# ---- Runner Stage ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy migration files and compiled runner
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --from=builder --chown=nextjs:nodejs /app/migrate.js ./migrate.js

COPY --chown=nextjs:nodejs ./docker/next/prod/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["/entrypoint.sh"]