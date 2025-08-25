# --- build ---
FROM node:20 AS build
ARG VITE_API_URL=http://localhost:5000
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# inyectar .env.production en build
RUN echo "VITE_API_URL=${VITE_API_URL}" > .env.production
RUN npm run build

# --- serve ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# SPA fallback
RUN printf 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files $uri /index.html; } \
    }\n' > /etc/nginx/conf.d/default.conf
EXPOSE 80
