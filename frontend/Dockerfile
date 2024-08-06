FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=build /app/build /app/build

RUN npm install -g serve

CMD ["serve", "-s", "build"]

EXPOSE 5173
