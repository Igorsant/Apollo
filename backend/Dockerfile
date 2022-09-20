FROM node:18 as build

WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE $PORT

CMD ["npm", "run", "docker"]
