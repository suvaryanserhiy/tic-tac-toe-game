function GameOver({ winner, onRestart }) {
	return (
		<div id='game-over'>
			<h2>Game Over!</h2>
			{/* show when winner is some player */}
			{winner && <p>{winner} won!</p>}
			{/* show when winner is false */}
			{!winner && <p>It&apos;s a draw!</p>}
			<p>
				<button onClick={onRestart}>Rematch!</button>
			</p>
		</div>
	);
}

export default GameOver;
