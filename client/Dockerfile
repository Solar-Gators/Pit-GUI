FROM ghcr.io/solar-gators/base-image:latest as build

WORKDIR /app/client

COPY ./client/package.json ./package.json
COPY ./client/package-lock.json ./package-lock.json

RUN npm ci

ARG REACT_APP_TELEMETRY_API
ENV REACT_APP_TELEMETRY_API=$REACT_APP_TELEMETRY_API

COPY ./client/src ./src
COPY ./client/public ./public
COPY ./client/tsconfig.json ./tsconfig.json

RUN npm run build


# production environment
FROM nginx:1.21.1-alpine
COPY --from=build /app/client/build /usr/share/nginx/html
COPY client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
