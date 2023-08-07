# Setup NodeJS v18 with lightweight version
FROM node:18-alpine
# Set working directory
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy source code
COPY . .
# Expose port 8080
EXPOSE 8122
# Run the app
CMD ["npm", "start"]
