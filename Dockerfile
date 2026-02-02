# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG GEMINI_API_KEY
ARG GOOGLE_CLIENT_ID
ENV GEMINI_API_KEY=${GEMINI_API_KEY}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}

RUN npm run build

# Stage 3: Production with nginx
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 41973

CMD ["nginx", "-g", "daemon off;"]
