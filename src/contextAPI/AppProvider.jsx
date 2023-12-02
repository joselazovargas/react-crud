import { createContext, useEffect, useState } from "react";
import {
	addTodo,
	deleteTodo,
	getTodos,
	loginUser,
	markTodoComplete,
	registerUser,
	updateTodo,
} from "../backend/Queries";

// creating context
const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppContextProvider = ({ children }) => {
	// State to hold the array of todos
	const [todos, setTodos] = useState([]);
	// State to hold the index of the todo being edited, if any
	const [editingId, setEditingId] = useState(null);
	// State to hold the current text input value
	const [text, setText] = useState("");
	const [user, setUser] = useState(null);

	const handleKeyDown = (event) => {
		// If the key pressed is Enter
		// event.code returns they pressed key code
		if (event.code === "Enter") {
			handleAddOrUpdate();
		}
	};

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
	}, []);

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
				const t = newTodos.find((todo) => todo.id === editingId);

				await updateTodo(t.id, text);

				setEditingId(null); // Reset editing index after updating
			} else {
				// ADD TODO
				await addTodo(text);
			}
			setText(""); // Clear the input field
		}
	};

	/**
	 * Function to delete a specific todo based on its index.
	 *
	 * @param {Object} event - The event object from the click event (not used in the function but can be utilized if needed).
	 * @param {number} index - The index of the todo item to be deleted from the todos array.
	 */
	const handleDelete = async (id) => {
		await deleteTodo(id);
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
		const t = newTodos.find((t) => t.id === id);
		markTodoComplete(id, t.completed);
	};

	// register use
	const register = (email, password) => {
		registerUser(email, password, setUser);
	};

	// register use
	const login = (email, password) => {
		loginUser(email, password, setUser);
	};

	return (
		<AppContext.Provider
			value={{
				user,
				text,
				todos,
				setText,
				handleAddOrUpdate,
				handleDelete,
				handleEdit,
				handleCompleted,
				handleKeyDown,
				register,
				login,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;

// it has curly brackets because it could be more than 1 {a,b,c}
export { AppContextProvider };
