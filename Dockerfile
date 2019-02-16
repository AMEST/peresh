FROM node:8-alpine
COPY . /app
COPY entrypoint.sh /usr/local/bin/
WORKDIR /app
RUN chmod +x /usr/local/bin/entrypoint.sh
RUN npm install
RUN npm run build

ENTRYPOINT ["entrypoint.sh"]
CMD ["node", "express.js"]
