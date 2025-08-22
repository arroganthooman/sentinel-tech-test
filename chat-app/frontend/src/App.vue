<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <div v-if="!joined" class="w-96 p-6 bg-white shadow-lg rounded-2xl">
      <h1 class="text-xl font-bold mb-4 text-center">Join Chat Room</h1>
      <input v-model="username" placeholder="Enter username"
        class="w-full p-2 border rounded mb-2" />
      <input v-model="room" placeholder="Enter room number"
        class="w-full p-2 border rounded mb-2" />
      <button @click="joinRoom"
        class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Join
      </button>
    </div>

    <div v-else class="flex flex-col w-full max-w-md h-[90vh] bg-white shadow-lg rounded-2xl overflow-hidden">
      <!-- Chat Header -->
      <div class="bg-green-500 text-white p-3 font-semibold">
        Room: {{ room }}
      </div>

      <!-- Chat Messages -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        <transition-group name="fade" tag="div">
          <div v-for="(msg, index) in messages" :key="index"
            class="flex" :class="msg.username === username ? 'justify-end' : 'justify-start'">
            <div
              class="px-3 py-2 rounded-2xl max-w-[70%] shadow"
              :class="msg.username === username ? 'bg-green-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'">
              <p class="text-sm"><span v-if="msg.username !== username" class="font-bold">{{ msg.username }}: </span>{{ msg.message }}</p>
              <p class="text-xs opacity-70 mt-1 text-right">{{ formatTime(msg.timestamp) }}</p>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Input Box -->
      <div class="p-3 flex gap-2 border-t">
        <input v-model="newMessage" @keyup.enter="sendMessage"
          placeholder="Type a message"
          class="flex-1 border rounded-full px-4 py-2 focus:outline-none" />
        <button @click="sendMessage"
          class="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:3001");

const username = ref("");
const room = ref("");
const joined = ref(false);

const messages = ref([]);
const newMessage = ref("");
const messagesContainer = ref(null);

const joinRoom = () => {
  if (username.value && room.value) {
    socket.emit("joinRoom", { username: username.value, room: room.value });
    joined.value = true;
  }
};

const sendMessage = () => {
  if (newMessage.value.trim() !== "") {
    socket.emit("sendMessage", {
      username: username.value,
      room: room.value,
      message: newMessage.value,
    });
    newMessage.value = "";
  }
};

socket.on("receiveMessage", (msg) => {
  messages.value.push(msg);
  scrollToBottom();
});

socket.on("chatHistory", (history) => {
  messages.value = history;
  scrollToBottom();
});

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
