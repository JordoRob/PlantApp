FROM node:alpine
WORKDIR /server
COPY . /server

RUN npm install -g nodemon
RUN npm install

#Give the path of your endpoint
ENTRYPOINT ["nodemon","-L", "/server/index.js"]  
CMD ["npm", "start"]