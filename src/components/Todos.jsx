import { useContext } from "react";
import Todo from "./Todo";
import AppContext from "../contextAPI/AppProvider";

// eslint-disable-next-line react/prop-types
const Todos = () => {
	const { todos, handleCompleted, handleEdit, handleDelete } =
		useContext(AppContext);

	return (
		<>
			{/* eslint-disable-next-line react/prop-types */}
			{todos.map((todo) => (
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

export default Todos