#!/bin/sh
# docker/next/dev/entrypoint.sh

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

# Wait for the database
wait_for_postgres

# Using the same script sequence as the original codebase for development
echo "Generating database schemas..."
npm run db:generate

echo "Pushing migrations to database..."
npm run db:migrate

#echo "Pushing Payload CMS migrations to database..."
#npm run payload:migrate

#echo "Seeding database..."
#npm run db:seed

echo "Starting development server..."
exec npm run dev