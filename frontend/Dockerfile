# Builder stage: build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install all dependencies (including dev for building)
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

# Copy all source files
COPY . .

# Build the Next.js app
RUN npm run build

# Runner stage: production image
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only production dependencies (avoid reinstalling dev deps)
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --omit=dev

# Copy build output and public folder from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_BASE_URL=http://backend:8000/api

CMD ["npm", "start"]
