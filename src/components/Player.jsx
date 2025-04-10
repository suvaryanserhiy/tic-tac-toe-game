import { useState } from 'react';
function Player({ initialName, symbol, isActive, onChangeName }) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	// function to handle "edit" button click using React team recomended way
	function handleEditClick() {
		setIsEditing((editing) => !editing);
		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	}

	// function to handle player name change
	function handlePlayerNameChange(e) {
		setPlayerName(e.target.value);
	}

	//set player`s name
	let editablePlayerName = <span className='player-name'>{playerName}</span>;
	// if Edit button is pressed show input field
	if (isEditing) {
		editablePlayerName = (
			<input
				type='text'
				value={playerName}
				onChange={handlePlayerNameChange}
				required
			/>
		);
	}
	return (
		<li className={isActive ? 'active' : undefined}>
			<span className='player'>
				{editablePlayerName}
				<span className='player-symbol'>{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
		</li>
	);
}

export default Player;
