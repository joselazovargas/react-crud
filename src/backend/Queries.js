import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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

export const markTodoComplete = async (id, completed) => {
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

export const registerUser = (email, password, setUser) => {
	createUserWithEmailAndPassword(auth, email, password)
		// createUserWithEmailAndPassword return a user credential object, userCred in this case
		// then we are destructuring userCred and grabbing the user object
		// then we are creating a new object with the user id, email and token
		.then((userCred) => {
			const { user } = userCred
			const usr = {
				id: user.uid,
				email: user.email,
				token: user.accessToken,
			}
			// store the user in storage
			localStorage.setItem("todo-user", JSON.stringify(usr));
			// update state
			setUser(usr);

			// TODO:go to todos page

		}).catch(err => {
			console.log(err);
			alert(err.message)
		})
}

export const loginUser = (email, password, setUser) => {
	signInWithEmailAndPassword(auth, email, password)
		.then(({ user }) => {
			const usr = {
				id: user.uid,
				email: user.email,
				token: user.accessToken,
			}
			// store the user in storage
			localStorage.setItem("todo-user", JSON.stringify(usr));
			// update state
			setUser(usr);

			// TODO:go to todos page

		}).catch(err => {
			console.log(err)
			alert(err.message)
		})
}