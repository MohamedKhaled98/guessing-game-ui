import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.SERVER_URL as string;
console.log("CONNECTED TO : ", URL);
export const socket = io(URL, {
  transports: ["websocket"],
});
