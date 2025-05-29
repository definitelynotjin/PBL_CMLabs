# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Runner stage
FROM node:18-alpine AS runner
WORKDIR /app

# Only copy the necessary files for running the app
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci --omit=dev

# Copy built output from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_BASE_URL=http://backend:8000/api

CMD ["npm", "start"]
