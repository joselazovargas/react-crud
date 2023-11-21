import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";

const todosCollection = "todos"

export const getTodos = async (setTodos) => {
	// TODO onSnapshot monitor a collection in this case "todos"
	await onSnapshot(collection(db, todosCollection), querySnapshot => {
		const queryTodos = [];
		querySnapshot.forEach(doc => {
			queryTodos.push({
				id: doc.id,
				text: doc.data().text,
				completed: doc.data().completed
			})
		})
		setTodos(queryTodos)
	})

}

export const addTodo = async (text) => {
	await addDoc(collection(db, todosCollection), {
		text,
		completed: false,
	});
}

export const updateTodo = async (id, text) => {

	const docRef = doc(
		db,
		todosCollection,
		id
	);

	// Set the "capital" field of the city 'DC'
	await updateDoc(docRef, {
		text
	});
}

export const markTodoComplete = async(id, completed) => {
	const docRef = doc(
		db,
		todosCollection,
		id
	);

	// Set the "capital" field of the city 'DC'
	await updateDoc(docRef, {
		completed: !completed
	});
}

export const deleteTodo = async (id) => {
	await deleteDoc(doc(db, todosCollection, id));
}