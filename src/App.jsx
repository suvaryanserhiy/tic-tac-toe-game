import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/player';

function App() {
	// State declaration
	const [activePlayer, setActivePlayer] = useState('X');
	const [gameTurns, setGameTurns] = useState([]);

	//hendling functions
	function handleSelectSquare() {
		setActivePlayer((currentActivePlayer) =>
			currentActivePlayer === 'X' ? 'O' : 'X'
		);
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
				<GameBoard
					onSelectSquare={handleSelectSquare}
					activePlayerSymbol={activePlayer}
				/>
			</div>
			<Log />
		</main>
	);
}

export default App;
