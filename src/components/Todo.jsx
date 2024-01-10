import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../contextAPI/AppProvider";

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
	const { getImg } = useContext(AppContext);
	const [img, setImg] = useState("");

	useEffect(() => {
		// eslint-disable-next-line react/prop-types
		getImg(todo.id, setImg);

		// cleanup
		// return () => {
		// 	setImg("");
		// };
	}, []);

	const handleView = () => {
		// eslint-disable-next-line react/prop-types
		console.log(todo.id);
		// eslint-disable-next-line react/prop-types
		goTo("/todos/" + todo.id);
	};

	return (
		<div className="bg-white p-5 rounded-md flex gap-2 items-center">
			<img
				src={
					img ||
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQErufEdC325ECfUANYh7lzYRbsQxI67-xbjj3kfbovEQ&s"
				}
				alt=""
				className="w-10 h-10 rounded-md"
			/>
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
