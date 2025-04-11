function GameBoard({ onSelectSquare, board }) {
	return (
		<ol id='game-board'>
			{board.map((row, rowIndex) => (  // take`s the row
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, columnIndex) => ( // take`s the column
							<li key={columnIndex}>
								<button
									onClick={() => onSelectSquare(rowIndex, columnIndex)}
									disabled={playerSymbol} // disable the button if some player have clicked 
								>
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
