"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const PORT = parseInt(process.env.PORT || "8080");
const wss = new ws_1.WebSocketServer({ port: PORT });
const gameManager = new GameManager_1.GameManager();
wss.on("connection", (ws) => {
    gameManager.addUser(ws);
    ws.on("close", () => {
        gameManager.removeUser(ws);
    });
});
console.log("WebSocket server is running on ws://localhost:8080");
