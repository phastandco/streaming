FROM node:17-slim
WORKDIR /App
COPY package.json /App
RUN npm install
COPY . /App
CMD ["yarn", "start"]
