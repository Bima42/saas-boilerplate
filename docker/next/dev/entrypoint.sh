#!/bin/sh

set -e

# Function to wait for PostgreSQL to be available
wait_for_postgres() {
  echo "Waiting for PostgreSQL to be ready..."

  # The DATABASE_URL is passed from docker-compose.yml
  # We use psql to check the connection.
  until psql "$DATABASE_URL" -c '\q'; do
    >&2 echo "PostgreSQL is unavailable - sleeping"
    sleep 1
  done

  echo "PostgreSQL is up and running!"
}

wait_for_postgres

echo "Generating database schemas..."
pnpm run db:generate

echo "Pushing migrations to database..."
pnpm run db:migrate

#echo "Seeding database..."
#pnpm run db:seed

echo "Starting development server..."
exec pnpm run dev