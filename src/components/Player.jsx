import { useState } from 'react';
function Player({ initialName, symbol }) {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);

	// function to handle "edit" button click using React team recomended way
	function handleEditClick() {
		setIsEditing((editing) => !editing);
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
		<li>
			<span className='player'>
				{editablePlayerName}
				<span className='player-symbol'>{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
		</li>
	);
}

export default Player;
