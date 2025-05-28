# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

# Copy all source files
COPY . .

# Build the Next.js app
RUN npm run build

# Runner stage
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only production dependencies
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install ci

# Copy build output and source files needed to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_BASE_URL=http://backend:8000/api

CMD ["npm", "start"]
