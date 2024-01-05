import { AppContextProvider } from "./contextAPI/AppProvider";
import Login from "./pages/Login";
import TodoDetail from "./pages/TodoDetail";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TodosHomePage from "./pages/TodosHomePage";

function App() {
	return (
		<BrowserRouter>
			<AppContextProvider>
				<div className="h-[100vh] border-2 bg-purple-500 flex justify-center items-center">
					<Routes>
						<Route index element={<Login />} />
						<Route path="/todos" element={<TodosHomePage />} />
						<Route path="/todos/:id" element={<TodoDetail />} />
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
	- Sign up
		- Add extra fields to user, ie: IG URL
	FIXED:BUG: when i login to a different user, after a previous login, refresh the todos on page
	TODO:
	- Shared to dos, google drive style
	- Storage
		- Upload an image
		- Link content with user
	- Testing
	- Loading state for content queries - skeleton effect
	NEXT WEEK:
	- Planning and visual representation of a system
	- How to manage a projects from the start
*/
// TODO:BUG -> images don't show at on page load, but show after
// FIXED: There was an unintentional delay while loading the todo's images
// This was fixed by creating separete async functions, one for
// getting the todos, another one for just getting the images.
// [
// 	{id:1, isOwner:true, permission:["view","edit","delete"]},
// 	{id:2,permissions:["view", "edit", "delete", "update"]},
// 	{id:2, permissions:["view", "edit"]}
// ]
