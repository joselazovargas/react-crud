import React from "react";
import Todo from "./Todo";


// eslint-disable-next-line react/prop-types
export const Todos = ({todos, handleCompleted, handleEdit, handleDelete}) => {
	return (
		<>
			{/* eslint-disable-next-line react/prop-types */}
			{todos.map((todo) => (
				<Todo todo={todo} key={todo.id} handleCompleted={handleCompleted} handleEdit={handleEdit} handleDelete={handleDelete}  />
			))}
		</>
	);
};
