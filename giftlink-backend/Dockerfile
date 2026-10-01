FROM node:20-alpine

WORKDIR /app

# Install production dependencies first for better layer caching.
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the application source.
COPY . .

EXPOSE 3060

# Run as a non-root user.
USER node

CMD ["node", "app.js"]