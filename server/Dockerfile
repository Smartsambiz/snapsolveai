# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of your backend code
COPY . .

# Expose the port your app uses (usually 3000 or 8080)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
