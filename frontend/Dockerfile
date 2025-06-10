# Build stage
FROM node:18 AS builder
WORKDIR /app

# Copy package files and install dependencies cleanly
COPY package.json package-lock.json ./
RUN npm ci

# Copy all source files and build the Next.js app
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only the necessary artifacts from build stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

# Run the app in production mode
CMD ["npm", "start"]


