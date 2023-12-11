import { AppContextProvider } from "./contextAPI/AppProvider";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TodosHomePage from "./pages/TodosHomePage";

function App() {
	return (
		<BrowserRouter>
			<AppContextProvider>
				<div className="h-[100vh] border-2 bg-purple-500 flex justify-center items-center">
					<Routes>
						<Route index element={<Login />} />
						<Route
							path="/todos"
							element={<TodosHomePage />}
						/>
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</div>
			</AppContextProvider>
		</BrowserRouter>
	);
}

export default App;

/*
	DONE:
	- Routing
		- React Router
		- Protect the routes
	TODO:
	- Sign up
		- Add extra fields to user, ie: IG URL
	TODO:BUG: when i login to a different user, after a previous login, refresh the todos on page
	- Shared to dos, google drive style
	- Storage
		- Upload an image
		- Link content with user
	- Testing
	- Loading state for content queries - skeleton effect
*/
