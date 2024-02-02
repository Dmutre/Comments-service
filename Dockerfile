FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build && \
    mkdir static 

EXPOSE 5000

CMD npx prisma migrate deploy && npm start
