FROM node:lts-alpine as builder
WORKDIR /static
RUN apk --no-cache --virtual add autoconf file gcc libc-dev make g++ pkgconf re2c git automake build-base libtool nasm libpng-dev
# RUN npm i -g gifsicle optipng mozjpeg svgo imagemin-optipng
COPY ./package*.json /static/
RUN npm ci
RUN npm i imagemin-jpegtran imagemin-svgo imagemin-gifsicle imagemin-optipng -D
COPY . .
RUN npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /static/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
