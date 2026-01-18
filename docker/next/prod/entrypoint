#!/bin/sh
set -e

echo "Running database migrations..."
node migrate.cjs

echo "Starting Next.js server..."
exec node server.js