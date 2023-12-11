import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTodo from "../components/AddTodo";
import Todos from "../components/Todos";

const TodosHomePage = () => {
	const goTo = useNavigate();

	useEffect(() => {
		const usr = JSON.parse(localStorage.getItem("todo-user"));
		if (!usr) goTo("/");
	}, []);

	return (
		<div className="w-[500px] ">
			<AddTodo />

			<div className="w-full flex gap-2 flex-col max-h-[700px]">
				<Todos />
			</div>
		</div>
	);
};

export default TodosHomePage;
