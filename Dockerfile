# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /app

# install dependencies into temp directory
# this will cache them and speed up future builds
COPY package.json ./
COPY bun.lockb ./

ENV PROD=true

RUN bun install

COPY . .

# run the app
USER root
EXPOSE 8080
ENTRYPOINT [ "bun", "dev"]