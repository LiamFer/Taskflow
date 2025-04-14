import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BASE_URL || "http://localhost:3000/",{
  autoConnect: false,
  transports: ["websocket"],
}); 

export default socket

