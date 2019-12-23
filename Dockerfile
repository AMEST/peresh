FROM node:10-alpine as build
COPY . /build
WORKDIR /build
RUN chmod +x /usr/local/bin/entrypoint.sh;\
    npm install;\
    npm run build

FROM nginx:1.17-alpine
COPY --from=build /build/dist /usr/share/nginx/html