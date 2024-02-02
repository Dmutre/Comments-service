FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build && \
    mkdir static

EXPOSE 3001

CMD [ "npm", "start" ]