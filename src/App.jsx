import { useState } from "react";
import Input from "./components/Input";
import Todos from "./components/Todos";
import Button from "./components/Button";
// import Input from "./components"

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
				// If it's new task

				// If the key and the value are the same we can just add the var "text"
				// {
				// 	text: text,
				// 	completed:true
				// }
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
		setEditingIndex(index);
		setText(text);
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
					<Input
						text={text}
						setText={setText}
						handleKeyDown={handleKeyDown}
					/>
					<Button text={editingIndex != null ? "Save" : "Add"} handleOnClick={handleAddOrUpdate} />
				</div>

				<Todos
					todos={todos}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					handleCompleted={handleCompleted}
				/>
			</div>
		</div>
	);
}

export default App;
