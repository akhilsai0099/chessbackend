"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Messages_1 = require("./Messages");
class Game {
    constructor(player1, player2) {
        this.turn = 0;
        this.winner = null;
        this.turns = 0;
        this.gameOver = false;
        this.gameID = "";
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        // this.board = new Board();
        this.turn = 0;
        this.winner = null;
        this.turns = 0;
        this.gameOver = false;
        this.gameID = this.generateGameId();
        this.moves = [];
        this.player1.send(JSON.stringify({ type: Messages_1.INIT_GAME, color: "white" }));
        this.player2.send(JSON.stringify({ type: Messages_1.INIT_GAME, color: "black" }));
    }
    setPlayer1(ws) {
        this.player1 = ws;
    }
    setPlayer2(ws) {
        this.player2 = ws;
    }
    generateGameId() {
        let id = "";
        for (var i = 0; i < 5; i++) {
            const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const randomIndex = Math.floor(Math.random() * letters.length);
            id += letters[randomIndex];
        }
        return id;
    }
    makeMove(socket, move) {
        if (this.player1 === null || this.player2 === null) {
            console.log("early return 0");
            return;
        }
        if (this.board.turn() === "w" && socket !== this.player1) {
            console.log("early return 1");
            return;
        }
        if (this.board.turn() === "b" && socket !== this.player2) {
            console.log("early return 2");
            return;
        }
        try {
            console.log(move);
            // console.log("control reached here");
            this.board.move(move);
            console.log(this.board.fen());
        }
        catch (e) {
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({ type: Messages_1.GAME_OVER, winner: this.board.turn() }));
            this.player2.send(JSON.stringify({ type: Messages_1.GAME_OVER, winner: this.board.turn() }));
            return;
        }
        this.player1.send(JSON.stringify({ type: Messages_1.UPDATE, fen: this.board.fen() }));
        this.player2.send(JSON.stringify({ type: Messages_1.UPDATE, fen: this.board.fen() }));
    }
}
exports.Game = Game;
