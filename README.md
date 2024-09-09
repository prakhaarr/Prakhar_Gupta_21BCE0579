# 🏏 21BCE0579 - Hitwicket: A Strategic Chess-like Game

![Game Board](/screenshot/Screenshot%202024-08-27%20at%2003.36.52.jpeg)

Welcome to **my assignment**, where I create dynamic and strategic chess-like game to test your wits and strategic thinking. Developed as part of the 21BCE0579 Hitwicket assignment, this game combines real-time multiplayer gameplay with a powerful WebSocket-powered client-server architecture.

## 🚀 Project Overview

**Hitwicket** is not just another board game; it's a modern twist on classic chess. The game features unique characters, each with its own movement abilities, adding layers of strategy and excitement. Whether you're playing as a pawn or a hero, every move matters.

## 🛠️ Technologies Used

- **Programming Language**: Python 🐍
- **Frontend**: HTML, CSS, JavaScript 🌐
- **Backend**: Python (Flask, WebSockets) 🛠️
- **WebSocket Communication**: Real-time interaction 🚀
- **Version Control**: Git 🧾
- **Development Environment**: Virtual Environment (venv) 🌍
- **IDE/Code Editor**: VS Code, PyCharm 💻

## 🌟 Game Features

- **Real-Time Multiplayer**: Play with friends or AI in real-time with seamless WebSocket communication.
- **Dynamic Characters**: Each character (Pawn, Hero1, Hero2, Hero3) has unique movement capabilities, adding depth to the gameplay.
- **Strategic Gameplay**: Make calculated moves, anticipate your opponent's strategy, and aim for victory.
- **Modern UI**: Enjoy a sleek and responsive user interface with dynamic feedback and glowing effects.

## 🚧 How It Works

1. **Game Initialization**: The game starts with each player having a set of unique characters on the board.
2. **Real-Time Communication**: Players' moves are communicated instantly between the client and server via WebSockets.
3. **Move Execution**: The server validates and processes each move, updating the game state in real-time.
4. **Winning the Game**: The game ends when one player eliminates all of the opponent's pieces or reaches the opponent's base.

## 🛠️ Setup & Installation

Follow these steps to get the game up and running:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/prakhaarr/Prakhar_Gupta_21BCE0579.git
    cd Prakhar_Gupta_21BCE0579
    ```

2. **Create a Virtual Environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Run the WebSocket Server**:
    ```bash
    cd server
    python main.py

    cd client
    python -m http.server 8000
    ```

5. **Open the Game in a Browser**:
    Open the `index.html` file located in the `client` directory in your preferred web browser.

## 🎮 Gameplay Instructions

- **Pawn (P):** Moves 1 step in any direction.
- **Hero1 (H1):** Moves 2 steps in any straight direction.
- **Hero2 (H2):** Moves 2 steps diagonally.
- **Hero3 (H3):** Moves 2 steps in one direction, then 1 step perpendicular.

## ✨ Future Enhancements

- **AI Opponents**: Implement AI players to challenge solo players.
- **Enhanced Visual Effects**: Further improve the UI with animations and visual effects.
- **Leaderboard**: Add a leaderboard to track player rankings.

## 📫 Contact Me

For any queries, feedback, or contributions, feel free to reach out:

- **Prakhar Gupta** - [prakhargupta0607@gmail.com](mailto:prakhargupta0607@gmail.com)

---

_“Strategy without tactics is the slowest route to victory. Tactics without strategy is the noise before defeat.” – Sun Tzu_

---

**Let's play and strategize!** 🏆
