import { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Log from './components/Log';
import Player from './components/player';
import { WINNING_COMBINATIONS } from './winning-combinations';

// constants declaring
const PLAYERS = {
	X: 'Player 1',
	O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

// derived functions
function deriveActivePlayer(gameTurns) {
	let currentPlayer = 'X';

	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		currentPlayer = 'O';
	}
	return currentPlayer;
}
// function to check if any of combinations is valid
function deriveWinner(gameBoard, players) {
	let winner;

	for (const combinations of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combinations[0].row][combinations[0].column];
		const secondSquareSymbol =
			gameBoard[combinations[1].row][combinations[1].column];
		const thirdSquareSymbol =
			gameBoard[combinations[2].row][combinations[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}
	return winner;
}

function deriveGameBoard(gameTurns) {
	let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, column } = square;

		gameBoard[row][column] = player;
	}
	return gameBoard;
}
function App() {
	// State declaration
	const [players, setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = deriveActivePlayer(gameTurns);
	const gameBoard = deriveGameBoard(gameTurns); //sets itinial game board (empty)
	const winner = deriveWinner(gameBoard, players);
	const hasDraw = gameTurns.length === 9 && !winner; // condition for check the draw

	//handling functions
	function handleSelectSquare(rowIndex, columnIndex) {
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);

			const updatedTurns = [
				// rewrites game board and adding the last move
				{
					square: { row: rowIndex, column: columnIndex },
					player: currentPlayer,
				},
				...prevTurns,
			];
			return updatedTurns;
		});
	}

	function handleRematch() {
		setGameTurns([]); // drops game board to her initial state
	}
	function handlePlayerNameChange(symbol, newName) {
		setPlayers((prevPlayers) => {
			// overwriting players name for specific symbol
			return {
				...prevPlayers,
				[symbol]: newName,
			};
		});
	}
	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player
						initialName={PLAYERS.X}
						symbol='X'
						isActive={activePlayer === 'X'}
						onChangeName={handlePlayerNameChange}
					/>
					<Player
						initialName={PLAYERS.O}
						symbol='O'
						isActive={activePlayer === 'O'}
						onChangeName={handlePlayerNameChange}
					/>
				</ol>
				{(winner || hasDraw) && ( // if we have winner or draw
					<GameOver winner={winner} onRestart={handleRematch} />
				)}
				<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
