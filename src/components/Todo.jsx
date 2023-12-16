import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

/*

alternative method

function Todo(props) {
	return (
		<p>props.todo.text</p>
		)
	}
*/

// eslint-disable-next-line react/prop-types
function Todo({ todo, handleCompleted, handleEdit, handleDelete }) {
	const goTo = useNavigate();

	const handleView = () => {
		// eslint-disable-next-line react/prop-types
		console.log(todo.id);
		// eslint-disable-next-line react/prop-types
		goTo("/todos/" + todo.id);
	};

	return (
		<div className="bg-white p-5 rounded-md flex gap-2 items-center">
			<p
				className={`flex-1 cursor-pointer ${
					// eslint-disable-next-line react/prop-types
					todo.completed && "line-through"
				}`}
				// eslint-disable-next-line react/prop-types
				onClick={() => handleCompleted(todo.id)}
			>
				{/* eslint-disable-next-line react/prop-types */}
				{todo.text}
			</p>
			<button onClick={() => handleView()} className="btn btn-accent">
				View
			</button>
			<button onClick={() => handleEdit(todo)} className="btn btn-accent">
				Edit
			</button>
			<button
				// eslint-disable-next-line react/prop-types
				onClick={() => handleDelete(todo.id)}
				className="btn btn-error"
			>
				Delete
			</button>
		</div>
	);
}

export default Todo;
