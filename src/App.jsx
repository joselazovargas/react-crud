import { Todos } from "./components/Todos";
import AddTodo from "./components/AddTodo";
import { AppContextProvider } from "./contextAPI/AppProvider";
import Login from "./components/Login";

function App() {
	return (
		<AppContextProvider>
			<div className="h-[100vh] border-2 bg-purple-500 flex justify-center items-center">
				{/* TODO:implement routing */}
				{/* <div className="w-[500px] ">
					<AddTodo />

					<div className="w-full flex gap-2 flex-col max-h-[700px]">
						<Todos />
					</div>
				</div> */}
				<Login />
			</div>
		</AppContextProvider>
	);
}

export default App;

/*
	Implement auth in new branch
*/
