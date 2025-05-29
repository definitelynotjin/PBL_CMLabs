# Runner stage
FROM node:18-alpine AS runner
WORKDIR /app

# Copy dependencies and install everything (including optional like @next/swc)
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --omit=dev  # instead of `npm ci --omit=dev`

# Copy built output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_BASE_URL=http://backend:8000/api

CMD ["npm", "start"]
