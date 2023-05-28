FROM ghcr.io/solar-gators/base-image:latest as build

WORKDIR /app/client

COPY ./client/package.json ./package.json
COPY ./client/package-lock.json ./package-lock.json

RUN npm ci --force

ARG REACT_APP_TELEMETRY_API
ENV REACT_APP_TELEMETRY_API=$REACT_APP_TELEMETRY_API

COPY ./client .

RUN npm run build


# production environment
FROM nginx:1.21.1-alpine
COPY --from=build /app/client/build /usr/share/nginx/html
COPY client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
