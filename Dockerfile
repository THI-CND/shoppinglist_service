FROM node:22 AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nest-cli.json .
COPY src/ src/

RUN npm run build

FROM node:22-slim

WORKDIR /app

COPY --from=build /app/node_modules/ node_modules/
COPY --from=build /app/dist/ dist/

EXPOSE 3000

ENTRYPOINT [ "node", "dist/main.js" ]
