import { useContext, useEffect, useState } from "react";
import Todo from "./Todo";
import AppContext from "../contextAPI/AppProvider";

// eslint-disable-next-line react/prop-types
const Todos = () => {
	const { todos, handleCompleted, handleEdit, handleDelete } =
		useContext(AppContext);
	const [t, setT] = useState([]);

	useEffect(() => {
		setT(todos);
	}, [todos]);

	return (
		<>
			{/* eslint-disable-next-line react/prop-types */}
			{t.map((todo) => (
				<Todo
					todo={todo}
					key={todo.id}
					handleCompleted={handleCompleted}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			))}
		</>
	);
};

export default Todos;
