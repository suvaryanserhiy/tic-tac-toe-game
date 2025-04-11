import { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Log from './components/Log';
import Player from './components/player';
import { WINNING_COMBINATIONS } from './winning-combinations';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function deriveActivePlayer(gameTurns) {
	let currentPlayer = 'X';

	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		currentPlayer = 'O';
	}
	return currentPlayer;
}

function App() {
	// State declaration
	//const [activePlayer, setActivePlayer] = useState('X');
	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = deriveActivePlayer(gameTurns);

	let gameBoard = initialGameBoard;

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, column } = square;

		gameBoard[row][column] = player;
	}

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
			winner = firstSquareSymbol;
		}
	}

	const hasDraw = gameTurns.length === 9 && !winner;
	//handling functions
	function handleSelectSquare(rowIndex, columnIndex) {
		// setActivePlayer((currentActivePlayer) =>
		// 	currentActivePlayer === 'X' ? 'O' : 'X'
		// );

		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);

			const updatedTurns = [
				{
					square: { row: rowIndex, column: columnIndex },
					player: currentPlayer,
				},
				...prevTurns,
			];
			return updatedTurns;
		});
	}
	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player
						initialName='Player 1'~
						symbol='X'
						isActive={activePlayer === 'X'}
					/>
					<Player
						initialName='Player 2'
						symbol='O'
						isActive={activePlayer === 'O'}
					/>
				</ol>
				{(winner || hasDraw )&& <GameOver winner={winner} />}
				<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
