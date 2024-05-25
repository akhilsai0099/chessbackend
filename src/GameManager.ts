import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./Messages";
import { Game } from "./Game";

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];
  constructor() {
    this.games = [];
    this.users = [];
    this.pendingUser = null;
  }
  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.handler(socket);
  }
  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
  }

  getGames() {
    return this.games;
  }
  getGameByID(gameID: string) {
    this.games.find((game) => game.gameID === gameID);
  }

  handleMove(socket: WebSocket, data: string) {
    const message = JSON.parse(data);
    const game = this.games.find(
      (game) => game.player1 === socket || game.player2 === socket
    );
    if (!game) {
      return;
    }
    game.makeMove(socket, message.move);
  }
  private handler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      switch (message.type) {
        case INIT_GAME:
          if (this.pendingUser) {
            const game = new Game(this.pendingUser, socket);
            this.games.push(game);
            this.pendingUser = null;
          } else {
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
        case MOVE:
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
