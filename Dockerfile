FROM node:14

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install
RUN npm run start:staging

EXPOSE 3000

CMD ["node", "server.js"]