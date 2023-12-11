import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';

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

export const registerUser = (email, password, setUser, goTo) => {
	createUserWithEmailAndPassword(auth, email, password)
		// createUserWithEmailAndPassword return a user credential object, userCred in this case
		// then we are destructuring userCred and grabbing the user object
		// then we are creating a new object with the user id, email and token
		.then(async (userCred) => {
			const { user } = userCred

			// adding user to users collection  for more field
			//TODO:recieve the returned user and add info to usr
			await createUserColl(user.uid, "http://image.com","https://defaultLink.com","jose")

			const usr = {
				id: user.uid,
				email: user.email,
				token: user.accessToken,
			}
			// store the user in storage
			localStorage.setItem("todo-user", JSON.stringify(usr));
			// update state
			setUser(usr);

			// go to todos page
			goTo("/todos")
		}).catch(err => {
			console.log(err);
			alert(err.message)
		})
}

export const loginUser = (email, password, setUser, goTo) => {
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

			// go to todos page
			goTo("/todos")
		}).catch(err => {
			console.log(err)
			alert(err.message)
		})
}

export const logoutUser = (setUser,goTo) => {
	signOut(auth)
		// when the result is successful
		.then(() => {
			// update state
			setUser(null);
			// remove user from storage
			localStorage.removeItem("todo-user");
			// go to login page
			goTo("/")
		})
		.catch(err => {
			console.log(err)
			alert(err.message)
		})
}

// Profile picture, URL, nickname
const createUserColl = async (id, imageUrl, socialUrl, nickname) => {
	await setDoc(doc(db, "users", id), {
		imageUrl,
		socialUrl,
		nickname
	})

	const usr = await getDoc(doc(db, "users", id))

	if(usr.exists()){
		console.log(usr.data())
		// TODO:return user with fields
	}
	else {
		return null
	}

}