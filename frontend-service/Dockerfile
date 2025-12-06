FROM node:21-alpine AS builder

WORKDIR /app

RUN apk add --no-cache curl

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]