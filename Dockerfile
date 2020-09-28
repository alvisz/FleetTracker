FROM node:current
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g @angular/cli
COPY . /app
RUN ng build --prod
CMD [ "npm", "run","server" ]
