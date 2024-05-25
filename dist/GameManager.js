"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Messages_1 = require("./Messages");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }
    addUser(socket) {
        this.users.push(socket);
        this.handler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter((user) => user !== socket);
    }
    getGames() {
        return this.games;
    }
    getGameByID(gameID) {
        this.games.find((game) => game.gameID === gameID);
    }
    handleMove(socket, data) {
        const message = JSON.parse(data);
        const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
        if (!game) {
            return;
        }
        game.makeMove(socket, message.move);
    }
    handler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            switch (message.type) {
                case Messages_1.INIT_GAME:
                    if (this.pendingUser) {
                        const game = new Game_1.Game(this.pendingUser, socket);
                        this.games.push(game);
                        this.pendingUser = null;
                    }
                    else {
                        this.pendingUser = socket;
                    }
                    console.log("player added");
                    // this.createGame(socket, message.name);
                    break;
                // case "join":
                //   this.joinGame(socket, message.id);
                //   break;
                // case "leave":
                //   this.leaveGame(socket);
                //   break;
                // case "start":
                //   this.startGame(socket);
                //   break;
                case Messages_1.MOVE:
                    this.handleMove(socket, data.toString());
                    break;
                // case "end":
                //   this.endGame(socket);
                //   break;
                default:
                    break;
            }
        });
    }
}
exports.GameManager = GameManager;
