FROM node:14

WORKDIR /app_root

COPY package*.json .

RUN npm install
COPY . .

CMD ["npm", "start"]
