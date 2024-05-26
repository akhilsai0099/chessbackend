import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, UPDATE } from "./Messages";

export class Game {
  public player1: WebSocket | null;
  public player2: WebSocket | null;
  private board: Chess;
  public turn: number = 0;
  public winner: string | null = null;
  public turns: number = 0;
  public gameOver: boolean = false;
  public gameID: string = "";
  public moves: string[];
  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    // this.board = new Board();
    this.turn = 0;
    this.winner = null;
    this.turns = 0;
    this.gameOver = false;
    this.gameID = this.generateGameId();
    this.moves = [];
    this.player1.send(JSON.stringify({ type: INIT_GAME, color: "white" }));
    this.player2.send(JSON.stringify({ type: INIT_GAME, color: "black" }));
  }

  public setPlayer1(ws: WebSocket): void {
    this.player1 = ws;
  }
  public setPlayer2(ws: WebSocket): void {
    this.player2 = ws;
  }
  public generateGameId(): string {
    let id = "";
    for (var i = 0; i < 5; i++) {
      const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const randomIndex = Math.floor(Math.random() * letters.length);

      id += letters[randomIndex];
    }
    return id;
  }

  public makeMove(socket: WebSocket, move: { from: string; to: string }) {
    if (this.player1 === null || this.player2 === null) {
      return;
    }
    if (this.board.turn() === "w" && socket !== this.player1) {
      return;
    }
    if (this.board.turn() === "b" && socket !== this.player2) {
      return;
    }
    try {
      this.board.move(move);
    } catch (e) {
      return;
    }

    if (this.board.isGameOver()) {
      this.player1.send(
        JSON.stringify({ type: GAME_OVER, winner: this.board.turn() })
      );
      this.player2.send(
        JSON.stringify({ type: GAME_OVER, winner: this.board.turn() })
      );
      return;
    }
    if (socket === this.player1)
      this.player2.send(
        JSON.stringify({ type: UPDATE, move: move, fen: this.board.fen() })
      );
    if (socket === this.player2)
      this.player1.send(
        JSON.stringify({ type: UPDATE, move: move, fen: this.board.fen() })
      );
  }
}
