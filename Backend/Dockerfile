# Use the official Node.js 20 image as the base image for the build stage
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a new stage for the production image
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "start:prod"]
