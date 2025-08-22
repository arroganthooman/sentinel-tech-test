FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build TS to JS (if you’re compiling in production)
RUN npm run build

# Expose backend port
EXPOSE 3001

# Start server
CMD ["npm", "start"]
