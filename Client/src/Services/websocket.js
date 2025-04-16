import { io } from "socket.io-client";
import { authMe } from "./userService";

const socket = io(import.meta.env.VITE_BASE_URL || "http://localhost:3000/", {
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;
