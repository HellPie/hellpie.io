FROM node:10.7.0-alpine

RUN apk add yarn

WORKDIR /usr/app
COPY package.json .
COPY yarn.lock .

RUN yarn install --production --non-interactive

COPY . .
