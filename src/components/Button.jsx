import React from 'react'

// eslint-disable-next-line react/prop-types
function Button({text, handleOnClick, className}) {
  return (
		<button onClick={handleOnClick} className={`btn btn-primary ${className}`}>
			{/* if there is a editingIndex show Save otherwise show Add */}
			{/* added != null because the index could be 0 when there is just one item */}
			{text}
		</button>
  );
}

export default Button