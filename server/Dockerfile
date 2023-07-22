FROM node:14-alpine3.10

WORKDIR /app

COPY . /app/

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]