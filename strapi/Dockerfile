# Use the official Node image as a base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY package.json .

# Install the app dependencies
RUN npm install

# Copy the rest of the application into the container
COPY . .



# Expose port 80
EXPOSE 8000


CMD ["npm", "start"]
