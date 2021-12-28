FROM node:16-alpine3.12 AS development
EXPOSE 8080

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine3.12 AS production
EXPOSE 8080

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
