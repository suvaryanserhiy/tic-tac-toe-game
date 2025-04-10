const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function GameBoard({ onSelectSquare, turns }) {
	let gameBoard = initialGameBoard;

	for (const turn of turns) {
		const { square, player } = turn;
		const { row, column } = square;

		gameBoard[row][column] = player;
	}

	return (
		<ol id='game-board'>
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, columnIndex) => (
							<li key={columnIndex}>
								<button onClick={() => onSelectSquare(rowIndex, columnIndex)}>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}

export default GameBoard;
