FROM node:18-alpine

WORKDIR /app/front

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "serve" ]