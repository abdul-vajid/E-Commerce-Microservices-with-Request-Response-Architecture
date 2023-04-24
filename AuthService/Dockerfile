# Use an official Node.js runtime as a parent image
FROM node:19

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for the AuthService
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

