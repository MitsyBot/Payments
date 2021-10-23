FROM node:14-alpine
LABEL org.opencontainers.image.source="https://github.com/MitsyBot/Motherlode"

RUN mkdir -p /usr/src/motherlode
WORKDIR /usr/src/motherlode

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/motherlode/
RUN npm install

RUN npm run build

EXPOSE 5671

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5671

EXPOSE 5671