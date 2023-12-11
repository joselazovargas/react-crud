import { useContext } from "react";
import AppContext from "../contextAPI/AppProvider";

// eslint-disable-next-line react/prop-types
function AddTodo() {
	const { text, setText, handleKeyDown, handleAddOrUpdate, editingId, logout } =
		useContext(AppContext);
	return (
		<div className="flex mb-10 max-w-full gap-2 py-5 px-7 bg-white rounded-md">
			<input
				onChange={(e) => setText(e.target.value)}
				value={text}
				className="input flex-1"
				type="text"
				placeholder="Enter todo"
				onKeyDown={handleKeyDown}
			/>
			<button onClick={handleAddOrUpdate} className="btn btn-primary">
				{/* if there is a editingId show Save otherwise show Add */}
				{editingId ? "Save" : "Add"}
			</button>

			<button className="btn btn-secondary" onClick={logout}>
				Logout
			</button>
		</div>
	);
}

export default AddTodo;
