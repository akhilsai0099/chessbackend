# Multiplayer Chess Game

## Overview

This project is a fully functional multiplayer chess game built using TypeScript, WebSockets, and React. The game allows two players to compete against each other in real-time, with seamless communication and interaction.

## Features

- **Real-Time Multiplayer**: Play chess with another player in real-time using WebSockets for instant communication.
- **Interactive UI**: A user-friendly interface built with React that provides a smooth and responsive gaming experience.
- **TypeScript**: Ensures type safety and maintainability of the codebase.
- **Chess Rules Enforcement**: The game enforces all standard chess rules, including check, checkmate, and stalemate.
- **Responsive Design**: Optimized for both desktop and mobile devices, allowing you to play anywhere.

## Technologies Used

- **TypeScript**: Provides static typing and improved code quality.
- **WebSockets**: Enables real-time communication between players.
- **React**: Manages the UI components and state management.

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.
- Basic knowledge of TypeScript and React.

### Installation

1. Clone the repositories:
   ```bash
   git clone https://github.com/akhilsai0099/chessbackend.git
   git clone https://github.com/akhilsai0099/chessFrontend.git
   ```
2. Open two terminals and navigate to the project directories:

   - In the first terminal:
     ```bash
     cd chessbackend
     ```

   - In the second terminal:
     ```bash
     cd chessFrontend
     ```

3. Install the dependencies in both directories:
   ```bash
   npm install
   ```

### Running the Game

1. Start the WebSocket server:
   ```bash
   npm run server
   ```
2. Start the React application:
   ```bash
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000` to start playing.

### How to Play

- Invite a friend to join the game by sharing the URL.
- Make your moves by clicking and dragging pieces on the chessboard.
- The game will automatically enforce the rules of chess and update the board in real-time.
