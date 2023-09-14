FROM node:current-alpine3.18
WORKDIR /ashwood-store
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm", "run", "start:dev" ]