import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
const PORT = parseInt(process.env.PORT || "8080");
const wss = new WebSocketServer({ port: PORT });

const gameManager = new GameManager();
wss.on("connection", (ws) => {
  gameManager.addUser(ws);

  ws.on("close", () => {
    gameManager.removeUser(ws);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
