# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install only production deps (layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# App port
EXPOSE 5000

# Non-root user (security)
RUN addgroup -S app && adduser -S app -G app
USER app

# Start app
CMD ["node", "server.js"]
