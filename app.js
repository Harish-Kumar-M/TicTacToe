const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
const resultMessage = document.getElementById('resultMessage');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (!gameActive || gameState[clickedCellIndex] !== '') {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `${getPlayerName(currentPlayer)}'s turn`;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 6; i += 3) {
        if (gameState[i] !== '' && gameState[i] === gameState[i + 1] && gameState[i] === gameState[i + 2]) {
            roundWon = true;
            break;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (gameState[i] !== '' && gameState[i] === gameState[i + 3] && gameState[i] === gameState[i + 6]) {
            roundWon = true;
            break;
        }
    }
    if ((gameState[0] !== '' && gameState[0] === gameState[4] && gameState[0] === gameState[8]) ||
        (gameState[2] !== '' && gameState[2] === gameState[4] && gameState[2] === gameState[6])) {
        roundWon = true;
    }

    if (roundWon) {
        resultMessage.textContent = `${getPlayerName(currentPlayer)} has won!`;
        resultMessage.style.display = 'block';
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        resultMessage.textContent = 'It\'s a draw!';
        resultMessage.style.display = 'block';
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function getPlayerName(player) {
    return player === 'X' ? playerXInput.value : playerOInput.value;
}

function handleRestartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusMessage.textContent = `${getPlayerName(currentPlayer)}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    resultMessage.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

