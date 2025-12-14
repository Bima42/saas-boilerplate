FROM node:20-alpine

RUN apk add --no-cache postgresql-client

# Enable Corepack to make pnpm available
RUN corepack enable

RUN adduser -D -s /bin/sh next
RUN mkdir -p /home/next/app
RUN chown -R next:next /home/next/app

WORKDIR /home/next/app

COPY --chown=next:next ./app/package*.json ./

USER next

RUN pnpm install

COPY --chown=next:next ./app/ /home/next/app/

COPY --chown=next:next ./docker/next/dev/entrypoint.sh /entrypoint
RUN chmod +x /entrypoint

ENTRYPOINT ["/entrypoint"]
