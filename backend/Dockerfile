FROM node:18 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /usr/src/app/build/ ./
COPY --from=build /usr/src/app/static ./static

EXPOSE $PORT

CMD ["node", "src/index.js"]
