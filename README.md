21BCE0579 - Hitwicket: A Strategic Chess-like Game
<!-- Replace with an actual image or GIF of your game -->

🚀 Project Overview
Welcome to Hitwicket, an innovative and strategic chess-like game built as part of the 21BCE0579 assignment. This project combines real-time gameplay with a WebSocket-powered client-server architecture, delivering a seamless and interactive gaming experience. From pawns to heroes, every move is calculated, and every decision could lead to victory or defeat.

🎮 Game Features
🧩 Dynamic Characters
Pawns (P): Move 1 step in any direction.
Hero1 (H1): Moves 2 steps in any straight direction, killing any opponent in its path.
Hero2 (H2): Moves 2 steps diagonally, eliminating any opponent in its way.
Hero3 (H3): A tactical piece, moving 2 steps in one direction and 1 step perpendicular, offering diverse strategic possibilities.
🔗 Real-time Client-Server Architecture
This project features a robust client-server architecture:

WebSocket Server: Powers real-time communication between players, ensuring instantaneous move updates and an immersive gaming experience.
Frontend: Built with HTML, CSS, and JavaScript, the frontend communicates with the server via WebSockets, rendering the board dynamically and processing user inputs.
🌟 Core Functionalities
Real-Time Gameplay: Moves are updated in real-time, thanks to WebSocket communication.
Strategic Depth: The unique movement patterns of each piece add layers of strategy to the gameplay.
Responsive Design: The game is designed to be responsive and visually appealing, with a modern UI.
Dynamic Board: The game board updates dynamically, reflecting the moves in real-time with visual feedback.
📚 Project Structure
client/

index.html - The main HTML file that structures the game's interface.
style.css - The CSS file responsible for the visual styling of the game.
script.js - JavaScript file handling the game logic on the client side, including WebSocket communication.
server/

game_logic.py - Python file containing the core game logic, including movement validation and game state management.
websocket_server.py - Python file implementing the WebSocket server, handling real-time communication between players.
main.py - The entry point for running the WebSocket server.
🛠️ Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Python, WebSockets
🚀 How to Run
1. Clone the Repository
bash
Copy code
git clone https://github.com/prakhaarr/Prakhar_Gupta_21BCE0579.git
cd Prakhar_Gupta_21BCE0579
2. Set Up the Python Environment
bash
Copy code
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
3. Run the WebSocket Server
bash
Copy code
cd server
python main.py
4. Open the Game in a Browser
Simply open client/index.html in your preferred web browser. Ensure that the WebSocket server is running before starting the game.

🔑 Key Highlights
Real-time Communication: The WebSocket server enables real-time gameplay, where each move is instantly reflected on all connected clients.
Strategic Gameplay: Each piece has unique movement capabilities, adding depth and complexity to the game.
Interactive UI: The user interface is not just functional but visually engaging, with glowing effects and responsive elements.
✨ What's Next?
AI Integration: Implementing AI opponents to challenge players in single-player mode.
Multiplayer Mode: Expanding the game to allow more players or team-based gameplay.
Enhanced Visuals: Adding more advanced visual effects to enhance the gaming experience.
🎯 Conclusion
Hitwicket is more than just a game; it’s a demonstration of strategic thinking, real-time communication, and dynamic interaction. Whether you're here to test your wits against an opponent or to explore the intricacies of a WebSocket-powered application, Hitwicket offers a unique and engaging experience.

