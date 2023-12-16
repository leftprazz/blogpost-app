
# Use an official Node.js runtime as the base image
FROM node:16-alpine

ARG COUCHDB_CREDENTIALS
ENV COUCHDB_CREDENTIALS=$COUCHDB_CREDENTIALS

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install && npm install dotenv

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 4000

RUN echo "DATABASE_URL=https://${COUCHDB_CREDENTIALS}@couchdb.leftprazz.com" >> .env

# Define the command to run the app
CMD ["node", "blog.js"]