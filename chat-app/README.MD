# Simple Chat App
A very simple and minimalist chat app where users can chat with multiple user inside a room. User just have to enter their name and the room that they're going.

## Services
This app consist of 2 services:
- Frontend (Vue.js)
- Backend (Node with Express.js, SocketIO, and Redis)


## Installation and Running
### Using Docker
1. Make you sure you have installed Docker and Docker Compose
2. Run the following command
```
docker compose up -d --build
```
3. Frontend will be run in localhost:80

### Using Node
1. Make sure you have installed Node.js v22 and redis in your local system. You can install it using traditional installation or NVM.

2. Inside the frontend folder, create .env file and fill it with the following
```
VITE_BACKEND_URL="http://localhost:3001"
```
3. Inside the backend folder, create .env file and fill it with the following
```
PORT=3001
REDIS_URL=localhost:6379
```
4. Run the following command inside the backend and frontend folder to run the services
```
npm run dev
```
5. The frontend will run in `localhost:5173` and the backend will run in `localhost:3001`

## How to use
1. Enter your name
2. Enter room number that you're going to. Enter the same room number that you will be chatting with your friends.
3. It supports multiple person chat (like group chat)