# docker/next/dev/Dockerfile
FROM node:20-alpine

# Install psql client to wait for the database to be ready
RUN apk add --no-cache postgresql-client

# Create a non-root user and its home directory, same as original codebase
RUN adduser -D -s /bin/sh next
RUN mkdir -p /home/next/app
RUN chown -R next:next /home/next/app

# Set the working directory
WORKDIR /home/next/app

# Copy package files and install dependencies
# This leverages Docker's layer caching
COPY --chown=next:next ./framae/package*.json ./
RUN npm install

# Switch to the non-root user
USER next

# Copy the rest of the application code
COPY --chown=next:next ./framae/ /home/next/app/

# Copy the entrypoint script and make it executable
COPY --chown=next:next ./docker/next/dev/entrypoint.sh /entrypoint
RUN chmod +x /entrypoint

ENTRYPOINT ["/entrypoint"]