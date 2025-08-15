FROM node:18-alpine

# Install OpenSSL and other dependencies
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including dev dependencies for build)
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build application
RUN npm run build

# Remove dev dependencies but keep dist
RUN npm prune --omit=dev && npm cache clean --force

# Expose port
EXPOSE 3001

# Start application
CMD ["node", "dist/src/main.js"]
