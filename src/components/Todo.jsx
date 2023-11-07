import React from "react";
import Button from "./Button";

// eslint-disable-next-line react/prop-types
function Todo({ todo, index, handleCompleted, handleEdit, handleDelete }) {
	return (
		<div
			key={index}
			className="bg-white p-5 rounded-md flex gap-2 items-center"
		>
			<p
				className={`flex-1 cursor-pointer ${
					todo.completed && "line-through"
				}`}
				onClick={() => handleCompleted(index)}
			>
				{/* eslint-disable-next-line react/prop-types */}
				{todo.text}
			</p>
			
			<Button
				text="Edit"
				handleOnClick={() => handleEdit(index, todo.text)}
				className="btn-accent"
			/>
			<Button
				text="Delete"
				handleOnClick={() => handleDelete(index)}
				className="btn-error"
			/>
		</div>
	);
}

export default Todo;
