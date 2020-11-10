FROM alpine/git as version
WORKDIR /src
COPY . /src
RUN echo "{\"version\":\"$(git describe --tags --always 2>/dev/null)\"}" > /version.json

FROM node:10-alpine as build
COPY . /build
WORKDIR /build
RUN npm install;\
    npm run build

FROM nginx:1.17-alpine
ENV DropBoxClientId=''
COPY --from=build /build/dist /usr/share/nginx/html
COPY --from=version /version.json /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf