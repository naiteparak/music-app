FROM node:18 AS build-env
COPY . /app
WORKDIR /app

RUN npm i --omit=dev

FROM gcr.io/distroless/nodejs18-debian11
COPY --from=build-env /app /app
WORKDIR /app
CMD ["dist/main.js"]