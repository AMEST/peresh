FROM node:10-alpine
COPY . /app
COPY entrypoint.sh /usr/local/bin/
WORKDIR /app
RUN chmod +x /usr/local/bin/entrypoint.sh;\
    npm install;\
    npm run build

ENTRYPOINT ["entrypoint.sh"]
CMD ["node", "express.js"]
