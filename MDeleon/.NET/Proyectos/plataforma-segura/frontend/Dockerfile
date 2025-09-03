# Etapa 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copiar package.json y lock
COPY package*.json ./
RUN npm install

# Copiar todo el frontend
COPY . .

# Compilar para producción
RUN npm run build

# Etapa 2: Nginx para servir frontend
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Eliminar html default y copiar build
RUN rm -rf ./*
COPY --from=build /app/dist .

# Copiar configuración de nginx opcional (si quieres SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
