const websocket = new WebSocket('ws://localhost:6789');
const boardElement = document.getElementById('board');
const currentPlayerElement = document.getElementById('current-player');
const selectedPieceElement = document.getElementById('selected-piece');
const moveHistoryElement = document.getElementById('move-history');
let selectedPiece = null;
let selectedMove = null;
let currentlySelectedButton = null;
let currentlySelectedCell = null;

console.log("WebSocket connection initiated");

loadSampleBoard();

function loadSampleBoard() {
    console.log("Loading sample board");
    const initialBoard = [
        ['A-P1', 'A-H1', 'A-H2', 'A-H3', 'A-P2'],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['B-P1', 'B-H1', 'B-H2', 'B-H3', 'B-P2']
    ];
    updateBoard(initialBoard);
}

function updateBoard(board) {
    console.log("Updating board on client-side", board);
    boardElement.innerHTML = '';
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.textContent = cell || '';
            cellElement.classList.add('cell');
            cellElement.onclick = () => selectPiece(rowIndex, colIndex, cell, cellElement);
            boardElement.appendChild(cellElement);
        });
    });
}

function selectPiece(row, col, piece, cellElement) {
    if (!piece) return;

    console.log("Piece selected", piece, "at position", row, col);


    if ((currentPlayerElement.textContent === 'A' && piece.startsWith('A-')) ||
        (currentPlayerElement.textContent === 'B' && piece.startsWith('B-'))) {
        selectedPiece = { row, col, piece };
        selectedPieceElement.textContent = piece;


        if (currentlySelectedCell) {
            currentlySelectedCell.style.backgroundColor = '#444';
        }
        cellElement.style.backgroundColor = 'green';
        currentlySelectedCell = cellElement;
        updateDirectionButtons(piece);
    } else {
        console.log("Invalid selection or it's not your turn.");
    }
}

function updateDirectionButtons(piece) {
    const pieceType = piece.split('-')[1];
    const directionButtons = document.querySelectorAll('#direction-buttons button');

    if (pieceType === 'H1') {
        directionButtons[0].setAttribute('onclick', "selectMove('0,-2', this)");
        directionButtons[1].setAttribute('onclick', "selectMove('0,2', this)");
        directionButtons[2].setAttribute('onclick', "selectMove('-2,0', this)");
        directionButtons[3].setAttribute('onclick', "selectMove('2,0', this)");
    } else if (pieceType === 'H2') {
        directionButtons[0].setAttribute('onclick', "selectMove('-2,-2', this)");
        directionButtons[1].setAttribute('onclick', "selectMove('-2,2', this)");
        directionButtons[2].setAttribute('onclick', "selectMove('2,-2', this)");
        directionButtons[3].setAttribute('onclick', "selectMove('2,2', this)");
    } else if (pieceType === 'H3') {
        directionButtons[0].setAttribute('onclick', "selectMove('2,1', this)");
        directionButtons[1].setAttribute('onclick', "selectMove('2,-1', this)");
        directionButtons[2].setAttribute('onclick', "selectMove('-2,1', this)");
        directionButtons[3].setAttribute('onclick', "selectMove('-2,-1', this)");
        directionButtons[4].setAttribute('onclick', "selectMove('1,2', this)");
        directionButtons[5].setAttribute('onclick', "selectMove('1,-2', this)");
        directionButtons[6].setAttribute('onclick', "selectMove('-1,2', this)");
        directionButtons[7].setAttribute('onclick', "selectMove('-1,-2', this)");
    } else {
        directionButtons[0].setAttribute('onclick', "selectMove('0,-1', this)");
        directionButtons[1].setAttribute('onclick', "selectMove('0,1', this)");
        directionButtons[2].setAttribute('onclick', "selectMove('-1,0', this)");
        directionButtons[3].setAttribute('onclick', "selectMove('1,0', this)");
    }
}

function selectMove(move, buttonElement) {
    if (!selectedPiece) {
        console.error("No piece selected.");
        return;
    }

    console.log("Move selected", move);

    const moveParts = move.split(',');
    if (moveParts.length === 2 && !isNaN(moveParts[0]) && !isNaN(moveParts[1])) {
        selectedMove = moveParts.map(Number); // Convert to an array of integers
        if (currentlySelectedButton) {
            currentlySelectedButton.style.backgroundColor = '#555';
        }
        buttonElement.style.backgroundColor = 'green';
        currentlySelectedButton = buttonElement;
    } else {
        console.error("Invalid move format. Expected 'row,col', got:", move);
    }
}

function submitMove() {
    console.log("Submitting move", selectedPiece, selectedMove);
    if (selectedPiece && selectedMove) {
        console.log("Move format before sending:", selectedMove);
        if (Array.isArray(selectedMove) && selectedMove.length === 2 && !isNaN(selectedMove[0]) && !isNaN(selectedMove[1])) {
            const data = {
                piece: selectedPiece,
                move: selectedMove
            };
            console.log("Sending move to server", data);
            websocket.send(JSON.stringify(data));

            // Reset selection after a move is submitted
            resetSelection();
        } else {
            console.error("Invalid move format. Move must be an array of two integers.", selectedMove);
        }
    } else {
        console.error("Move not submitted. Ensure a piece and move are selected.");
    }
}

function resetSelection() {
    selectedPiece = null;
    selectedMove = null;
    selectedPieceElement.textContent = 'None';
    if (currentlySelectedButton) {
        currentlySelectedButton.style.backgroundColor = '#555';
        currentlySelectedButton = null;
    }
    if (currentlySelectedCell) {
        currentlySelectedCell.style.backgroundColor = '#444';
        currentlySelectedCell = null;
    }
}

function addMoveToHistory(move) {
    const moveText = `${move.player}: ${move.piece.piece} -> ${move.move.join(',')}`;
    const moveElement = document.createElement('li');
    moveElement.textContent = moveText;
    moveHistoryElement.appendChild(moveElement);
}

function checkForWinner() {
    const board = Array.from(boardElement.children).map(cell => cell.textContent);

    const playerAPieces = board.filter(piece => piece.startsWith('A-'));
    const playerBPieces = board.filter(piece => piece.startsWith('B-'));

    const playerAHasReachedEnd = board.slice(20).some(piece => piece.startsWith('A-'));
    const playerBHasReachedEnd = board.slice(0, 5).some(piece => piece.startsWith('B-'));

    if (playerBPieces.length === 0 || playerAHasReachedEnd) {
        announceWinner('Player A');
    } else if (playerAPieces.length === 0 || playerBHasReachedEnd) {
        announceWinner('Player B');
    }
}

function announceWinner(winner) {
    const winnerMessageElement = document.getElementById('winner-message');
    const winnerAnnouncementElement = document.getElementById('winner-announcement');

    winnerMessageElement.textContent = `${winner} wins!`;
    winnerAnnouncementElement.style.display = 'block';
}

websocket.onmessage = function (event) {
    console.log("Message received from server", event.data);
    const data = JSON.parse(event.data);

    if (data.invalid_move) {
        alert(data.message);
    } else {
        updateBoard(data.board);
        currentPlayerElement.textContent = data.turn;
        resetSelection();


        const lastMove = data.lastMove;
        console.log("Last move received", lastMove);

        if (lastMove && lastMove.piece && lastMove.move) {
            addMoveToHistory(lastMove);
        }

        checkForWinner();
    }
};

websocket.onopen = function () {
    console.log("WebSocket connection opened");
};

websocket.onerror = function (error) {
    console.error("WebSocket error", error);
};

websocket.onclose = function () {
    console.log("WebSocket connection closed");
};
