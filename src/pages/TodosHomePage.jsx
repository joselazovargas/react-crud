import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTodo from "../components/AddTodo";
import Todos from "../components/Todos";
import {getStoredUser} from "../backend/Queries";

const TodosHomePage = () => {
	const goTo = useNavigate();
	const user = getStoredUser();

	//console.log(user);

	useEffect(() => {
		if (!user) goTo("/");
	}, []);

	return (
		<div className="w-[500px] ">
			{/* This and the next line do the same */}
			{/* <h1>{user.nickname ? user.nickname : user.email  }</h1> */}
			<h1>{user.nickname || user.email }</h1>
			<AddTodo />

			<div className="w-full flex gap-2 flex-col max-h-[700px]">
				<Todos />
			</div>
		</div>
	);
};

export default TodosHomePage;

/* 
	TODO: 
	- This version works, but the user.nickname should come from the ContextProvider, because the user could update the nickame in the future and because the user we are using here is a const and not a state, it won't be updated. Once we use the state user it will be updated whenever the user updates it.

*/
