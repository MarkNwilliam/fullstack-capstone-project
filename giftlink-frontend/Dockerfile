# Build stage: compile the React application.
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Serve stage: a lightweight static server for the compiled bundle.
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build ./build

EXPOSE 3000

USER node

CMD ["serve", "-s", "build", "-l", "3000"]