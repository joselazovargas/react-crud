import React from "react";
import Todo from "./Todo";



// eslint-disable-next-line react/prop-types
function Todos({ todos, handleCompleted, handleEdit, handleDelete }) {
	return (
		<div className="w-full flex gap-2 flex-col max-h-[700px]">
			{/* eslint-disable-next-line react/prop-types */}
			{todos.map((todo, index) => (
				// eslint-disable-next-line react/prop-types
				<Todo
					key={index}
					todo={todo}
					index={index}
					handleCompleted={handleCompleted}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			))}
		</div>
	);
}

export default Todos;
