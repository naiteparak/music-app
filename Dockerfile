FROM node:18-alpine
COPY package.json .
RUN npm i
COPY . .
CMD ["npm", "run", "start:dev"]