# Dockerize a Node.js app with VS Code

## docker pull ashwin2604/mern

1. Setup:

   a. mkdir test-node-app && cd test-node-app && npm init -y && code .
   b. npm i express

2. Create basic Node app:

   a. Open package.json file and modify it like this: Check the file

   b. Now add new file with name server.js: Check the file

   c. npm start

3. Prepare Docker file:

   a. touch Dockerfile

   b. touch .dockerignore

   c. Add below code in Dockerfile:
   
   FROM node:8
   //Create app directory
   WORKDIR /usr/src/app
   // Install app dependencies
   // A wildcard is used to ensure both package.json AND package-lock.json are copied
   COPY package\*.json ./
   RUN npm install
   // Bundle app source
   COPY . .
   EXPOSE 8080
   CMD [ "npm", "start" ]

   d. Add below code in .dockerignore:
   
   node_modules
   npm-debug.log

4. Build an Docker image:

   a. docker build -t test-node-app .
   b. docker images
   c. If you want to remove an image run this: docker rmi <image id>

5. Run Docker container (finally):
   
   a. Now we run our container and map 8080 port to 49165:  
   docker run -p 49165:8080 -d test-node-app

   b. To see all running containers:
   docker ps

   c. stop container by right click in VS Code Docker Extension or by this command:
   docker stop <container id>

   d. docker ps -a

# Dockerize a Node.js app connected to MongoDb

1. Install MongoDb locally:
   
   a. npm i mongoose
   b. npm install --save-dev nodemon

2. Connect to MongoDb through Express app:
   
   a. Create files: User.model.js and connection.js

3. Implement read and write to MongoDb:
   
   Now it's time to test! 🔍 Open in browser this link http://localhost:8080/user-create to create a dummy user record in db. Open this link http://localhost:8080/users to get all users as JSON in browser.

4. Dockerize Node and MongoDb:
   
   a. Now create another file called docker-compose.yml in api's root directory:
   version: "2"
   services:
   web:
   build: .
   ports: - "8080:8080"
   depends_on: - mongo
   mongo:
   image: mongo
   ports: - "27017:27017"

   b. Stop the server from running

   c. Run the command: docker-compose up

# Dockerize a React app with Node.js backend connected to MongoDb

1. Dockerize React app:
   
   a. In ui folder create a .dockeringore file and Dockerfile file:
   FROM node:14.16.0
   // Create app directory
   WORKDIR /usr/src/app
   // Install app dependencies
   COPY package\*.json ./
   RUN npm install --silent
   // Copy app source code
   COPY . .
   // Expose port and start application
   EXPOSE 3000
   CMD ["npm", "start"]

   b. build the image with tag react:app:
   docker build -t react:app .
   c. Run our tagged image and use the same port for docker:
   docker run -p 3000:3000 react:app
   d. docker ps
   e. docker stop <container id>

2. Call api from React app:
   
   a. npm i axios in ui and npm i cors in api

3. Run React and Node together in Docker:
   
   a. remove docker-compose.yml from directory api and create docker-compose.yml in root folder:
   version: '2'
   services:
   ui:
   build: ./ui
   ports: - '3000:3000'
   depends_on: - api
   api:
   build: ./api
   ports: - '8080:8080'
   depends_on: - mongo
   mongo:
   image: mongo
   ports: - '27017:27017'

   We have one docker-compose that describes what services we want to run in Docker. In our case we have three services: ui, api, mongo.

   b. docker-compose up --build --> from root folder

4. Use React production build:
   
   a. We simply need to change our Dockerfile in ui project. We will start a production build and serve it using nginx server.
   b. Since we now expose port 80, we need to change it from 3000 to 80 in docker-compose.yml.
   c. Run: docker-compose up --build
   d. docker tag full:latest ashwin2604/mern
   e. docker push ashwin2604/mern
