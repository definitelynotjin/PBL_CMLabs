# Use the official Node.js 18 image as base
FROM node:18-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if you have it)
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the Next.js app
RUN npm run build

# Production image, smaller and only contains the built app
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Expose port 3000
EXPOSE 3000

# Set environment variables for production (can override with Docker run)
ENV NODE_ENV production
ENV NEXT_PUBLIC_API_BASE_URL=http://backend:8000/api

# Start the Next.js production server
CMD ["npm", "start"]
