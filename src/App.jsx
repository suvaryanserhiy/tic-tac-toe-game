import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import Player from './components/player';

function App() {
	// State declaration
	const [activePlayer, setActivePlayer] = useState('X');
	const [gameTurns, setGameTurns] = useState([]);

	//hendling functions
	function handleSelectSquare(rowIndex, columnIndex) {
		setActivePlayer((currentActivePlayer) =>
			currentActivePlayer === 'X' ? 'O' : 'X'
		);
		setGameTurns((prevTurns) => {
			let currentPlayer = 'X';

			// condtition to get the last player and set to a next one
			if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
				currentPlayer = 'O';
			}

			const updatedTurns = [
				{
					square: { row: rowIndex, column: columnIndex },
					player: activePlayer,
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
						initialName='Player 1'
						symbol='X'
						isActive={activePlayer === 'X'}
					/>
					<Player
						initialName='Player 2'
						symbol='O'
						isActive={activePlayer === 'O'}
					/>
				</ol>
				<GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
