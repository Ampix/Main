FROM node:20
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm build

EXPOSE 3000
ENTRYPOINT [ "node", ".output/server/index.mjs" ]