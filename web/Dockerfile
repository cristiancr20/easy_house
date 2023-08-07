FROM node:14.17.6-alpine3.14

WORKDIR /app

COPY package*.json ./

ENV REACT_APP_API_URL=/api

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]