FROM ghcr.io/solar-gators/base-image:latest

WORKDIR /app/backend

COPY ./backend/package.json ./package.json
COPY ./backend/package-lock.json ./package-lock.json

RUN npm ci

RUN mkdir /client

COPY ./client/src/shared /app/client/src/shared

COPY ./backend .

RUN npm run build

CMD npm run start & node udp/server.js
