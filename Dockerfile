# Build stage
FROM --platform=linux/amd64 node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies including devDependencies
RUN yarn install --frozen-lockfile --production=false

# Copy source code
COPY . .

# Build the application
# ponytail: next/font/google 이 Google Fonts 응답에 따라 가끔 실패(확장자 없는 폰트 주소) → 2번까지 재시도. 계속 실패하면 폰트를 next/font/local 로 직접 두기
RUN yarn build || (sleep 5 && yarn build) || (sleep 15 && yarn build)

# Production stage
FROM --platform=linux/amd64 node:22-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Expose the port
EXPOSE 3000

# Healthcheck 비활성화
HEALTHCHECK NONE

# Start the application
CMD ["node", "server.js"]
