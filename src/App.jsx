import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./Backend/Firebase";
import { addTodo, deleteTodo, getTodos, markTodoComplete, updateTodo } from "./backend/Queries";
import { Todos } from "./components/Todos";
import AddTodo from "./components/AddTodo";

function App() {
	// State to hold the current text input value
	const [text, setText] = useState("");

	// State to hold the array of todos
	const [todos, setTodos] = useState([]);

	// State to hold the index of the todo being edited, if any
	const [editingId, setEditingId] = useState(null);

	// perform actions at specific stages of the component life cycle
	// useEffect(() => {
	// 	// called the first time the component is rendered
	// 	// called every time state changes
	// 	console.log("everytime")
	// })
	useEffect(() => {
		// called the first time the component is rendered
		// best for api calls
		getTodos(setTodos);
	},[])
	

	// useEffect(() => {
	// 	// called the first time the component is rendered
	// 	// called when todos and editingId changes
	// 	console.log("todos and editingId changes")
	// },[todos, editingId])

	// Function to handle adding a new todo or updating an existing one
	const handleAddOrUpdate = async () => {
		// Execute code if 'text' input is not empty and not just whitespace
		if (text.trim()) {
			if (editingId !== null) {
				// UPDATE TODO
				const newTodos = [...todos];
				const t = newTodos.find(todo => todo.id === editingId)

				await updateTodo(t.id,text)

					setEditingId(null); // Reset editing index after updating
			} else {
				// ADD TODO
				await addTodo(text)
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
	const handleDelete = async (id) => {
		await deleteTodo(id)
	};

	// AKA Update receive MouseEvent
	const handleEdit = (todo) => {
		// copy current todos
		setText(todo.text);
		setEditingId(todo.id);
	};

	// mark todo completed
	const handleCompleted = async (id) => {
		const newTodos = [...todos];
		const t = newTodos.find(t => t.id === id)
		markTodoComplete(id, t.completed)
	};

	return (
		<div className="h-[100vh] border-2 bg-purple-500 flex justify-center items-center">
			<div className="w-[500px] ">
				<AddTodo text={text} setText={setText} handleAddOrUpdate={handleAddOrUpdate} handleKeyDown={handleKeyDown}  />

				<div className="w-full flex gap-2 flex-col max-h-[700px]">
					<Todos
						todos={todos}
						handleCompleted={handleCompleted}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;

/*
	Configure .env 
	Take out all firebase related functions to a new file called BackendQueries
	seperate to components
	Push to firebasebranch
	Implement auth in new branch
*/