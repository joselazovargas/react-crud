import React from "react";

// eslint-disable-next-line react/prop-types
function Input({ text, setText, handleKeyDown } ) {

	return (
		<input
			onChange={(e) => setText(e.target.value)}
			value={text}
			className="input flex-1"
			type="text"
			placeholder="Enter todo"
			onKeyDown={handleKeyDown}
		/>
	);
}

export default Input;
