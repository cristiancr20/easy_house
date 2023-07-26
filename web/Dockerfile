FROM node:14-alpine3.10

WORKDIR /app

COPY package*.json ./

ENV REACT_APP_API_URL=/api

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]