# Simple Chat App
A very simple and minimalist chat app where users can chat with multiple user inside a room. User just have to enter their name and the room that they're going.

## Services
This app consist of 2 services:
- Frontend (Vue.js)
- Backend (Node with Express.js and SocketIO)


## Installation and Running
### Using Docker
1. Make you sure you have installed Docker and Docker Compose
2. Run the following command
```
docker compose up -d --build
```
3. Frontend will be run in localhost:80

### Using Node
1. Make sure you have installed Node.js v22. You can install it using traditional installation or NVM.
2. Run the following command inside the backend and frontend folder
```
npm run dev
```
3. The app will be run in `localhost:5173`