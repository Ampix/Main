# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /app

# install dependencies into temp directory
# this will cache them and speed up future builds
ENV PORT=8080

COPY package.json ./
COPY bun.lockb ./

RUN chown -R bun:bun ./

RUN chmod -R 777 ./

RUN bun install

COPY . .

# run the app
USER bun
EXPOSE 8080
ENTRYPOINT [ "bun", "dev"]