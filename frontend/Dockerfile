# Builder stage
FROM node:18 AS builder
WORKDIR /app

COPY package.json package-lock.json ./

# Debug: list files in /app to check if package.json is present
RUN ls -l /app

RUN pwd && ls -la /app && whoami

RUN npm ci

COPY . .
RUN npm run build

# Runner stage
FROM node:18 AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]
