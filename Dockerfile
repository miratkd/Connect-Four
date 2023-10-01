FROM node:16.16.0

RUN mkdir -p /home/app

COPY . /home/app

WORKDIR /home/app

RUN npm install

CMD ["npm", "run", "serve"]