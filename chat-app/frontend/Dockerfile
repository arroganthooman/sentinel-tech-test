# FROM node:22 AS build
# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# ARG VITE_BACKEND_URL
# ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# RUN npm run build

# # FROM alpine:3.18 AS frontend-dist
# # WORKDIR /dist
# # COPY --from=build /app/dist ./

# ===================

# frontend/Dockerfile
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_BACKEND_URL
RUN VITE_BACKEND_URL=$VITE_BACKEND_URL npm run build

FROM nginx:stable-alpine
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
