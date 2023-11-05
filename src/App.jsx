import { useState } from "react";

function App() {
	// State to hold the current text input value
	const [text, setText] = useState("");

	// State to hold the array of todos
	const [todos, setTodos] = useState([]);

	// State to hold the index of the todo being edited, if any
	const [editingIndex, setEditingIndex] = useState(null);

	// Function to handle adding a new todo or updating an existing one
	const handleAddOrUpdate = () => {
		// Execute code if 'text' input is not empty and not just whitespace
		if (text.trim()) {
			if (editingIndex !== null) {
				// If editing mode
				const newTodos = [...todos];
				newTodos[editingIndex].text = text; // Update the todo at the editing index
				setTodos(newTodos);
				setEditingIndex(null); // Reset editing index after updating
			} else {
				// If adding mode
				setTodos([{ text, completed: false }, ...todos]);
			}
			setText(""); // Clear the input field
		}
	};

	const handleKeyDown = (event) => {
		// If the key pressed is Enter
		// event.code returns they pressed key code
		if (event.code === "Enter") {
			handleAddOrUpdate();
		}
	};

	/**
	 * Function to delete a specific todo based on its index.
	 *
	 * @param {Object} event - The event object from the click event (not used in the function but can be utilized if needed).
	 * @param {number} index - The index of the todo item to be deleted from the todos array.
	 */
	const handleDelete = (index) => {
		// Create a new array that's a copy of the current todos array.
		// This ensures immutability, preventing direct modification of the state.
		const newTodos = [...todos];

		// Use the filter method to create a new array without the todo at the given index.
		// The filter function goes through each todo and its index (t and i respectively).
		// It keeps all todos where the index doesn't match the one we want to delete.
		setTodos(newTodos.filter((t, i) => i !== index));
	};

	// AKA Update receive MouseEvent
	const handleEdit = (index, text) => {
		// copy current todos
		setText(text);
		setEditingIndex(index);
	};

	// mark todo completed
	const handleCompleted = (index) => {
		const newTodos = [...todos];
		let todo = newTodos[index];
		todo.completed = !todo.completed; // Update the todo at the editing index

		newTodos.splice(index, 1);

		if (todo.completed) {
			setTodos([...newTodos, todo]);
		} else {
			setTodos([todo, ...newTodos]);
		}
	};

	return (
		<div className="h-[100vh] border-2 bg-purple-500 flex justify-center items-center">
			<div className="w-[500px] ">
				<div className="flex mb-10 max-w-full gap-2 py-5 px-7 bg-white rounded-md">
					<input
						onChange={(e) => setText(e.target.value)}
						value={text}
						className="input flex-1"
						type="text"
						placeholder="Enter todo"
						onKeyDown={handleKeyDown}
					/>
					<button
						onClick={handleAddOrUpdate}
						className="btn btn-primary"
					>
						{/* if there is a editingIndex show Save otherwise show Add */}
						{editingIndex ? "Save" : "Add"}
					</button>
				</div>

				<div className="w-full flex gap-2 flex-col max-h-[700px]">
					{todos.map((todo, index) => (
						<div
							key={index}
							className="bg-white p-5 rounded-md flex gap-2 items-center"
						>
							<p
								className={`flex-1 cursor-pointer ${
									todo.completed && "line-through"
								}`}
								onClick={() => handleCompleted(index)}
							>
								{todo.text}
							</p>
							<button
								onClick={() => handleEdit(index, todo.text)}
								className="btn btn-accent"
							>
								Edit
							</button>
							<button
								onClick={() => handleDelete(index)}
								className="btn btn-error"
							>
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
