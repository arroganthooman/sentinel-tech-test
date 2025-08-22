# # Stage 1: build
# FROM node:22 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: serve with Nginx
# FROM nginx:stable-alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80



FROM node:22 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build


FROM alpine:3.18 AS frontend-dist
WORKDIR /dist
COPY --from=build /app/dist ./
