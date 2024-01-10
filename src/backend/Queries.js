import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db, storage } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

const todosCollection = "todos"

export const getTodos = async (setTodos) => {

	const q = query(collection(db, todosCollection), where("userId", "==", getStoredUser().id));

	// DONE onSnapshot monitor a collection in this case "todos"
	await onSnapshot(q, querySnapshot => {
		const queryTodos = [];
		querySnapshot.forEach(async doc => {

			queryTodos.push({
				id: doc.id,
				text: doc.data().text,
				completed: doc.data().completed,
				userId: doc.data().userId,
			})
		})
		setTodos(queryTodos)
	})

}

// eslint-disable-next-line no-unused-vars
export const getSingleTodo = async (id, setTodoDetail) => {

	// This will get the docRef that we need in order to get the content
	const ref = doc(db, todosCollection, id)

	// Here's where we get the content
	const todoSnap = await getDoc(ref)
	if (todoSnap.exists()) {
		setTodoDetail(todoSnap.data())
	} else {
		console.log("Todo Detail not found")
	}
}

export const getSingleTodoImage = async (id, setImage) => {
	// get todo img
	const imgRef = ref(storage, "images");
	const imgs = await listAll(imgRef);
	// filter images to get todos img
	const imgX = imgs.items.find(img => img.name.includes(id))
	let img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQErufEdC325ECfUANYh7lzYRbsQxI67-xbjj3kfbovEQ&s" // set default img

	if (imgX) img = await getDownloadURL(imgX)

	setImage(img)
}


export const addTodo = async (text, img) => {
	const res = await addDoc(collection(db, todosCollection), {
		text,
		completed: false,
		userId: getStoredUser().id
	});
	// We add the ? after "res" to check if the request was successful
	if (res?.id) {
		uploadImg(img, res.id)
	}
}

export const updateTodo = async (id, text, img) => {

	const docRef = doc(
		db,
		todosCollection,
		id
	);

	// Set the "capital" field of the city 'DC'
	await updateDoc(docRef, {
		text
	});

	if (img) {
		const imgRef = ref(storage, "images");
		const imgs = await listAll(imgRef);
		const imgX = imgs.items.find(img => img.name.includes(id))

		const imgDeleteRef = ref(storage, imgX.fullPath)
		deleteObject(imgDeleteRef).then(() => {
			console.log(imgX.fullPath + " deleted!")
			uploadImg(img, id)
		}).catch(err => {
			console.log("err deleting img:", err)
		})
	}
}

function uploadImg(img, id) {
	const arr = img.name.split(".")
	const imgName = id + "." + arr[arr.length - 1]
	const imgRef = ref(storage, "/images/" + imgName);
	uploadBytes(imgRef, img).then((snapshot) => {
		console.log(imgName + " uploaded!", snapshot)
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

export const registerUser = (email, password, setUser, goTo, img, social, nick) => {
	createUserWithEmailAndPassword(auth, email, password)
		// createUserWithEmailAndPassword return a user credential object, userCred in this case
		// then we are destructuring userCred and grabbing the user object
		// then we are creating a new object with the user id, email and token
		.then(async (userCred) => {
			const { user } = userCred

			// adding user to users collection  for more field
			const moreUsrInfo = await createUserColl(user.uid, img, social, nick)
			const { imageUrl, socialUrl, nickname, createdAt } = moreUsrInfo

			const usr = {
				id: user.uid,
				email: user.email,
				token: user.accessToken,
				imageUrl,
				socialUrl,
				nickname,
				createdAt
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
		.then(async ({ user }) => {
			// get user other info 
			const moreUsrInfo = await updateUserColl(user.uid)
			const { imageUrl, socialUrl, nickname, createdAt, updatedAt } = moreUsrInfo

			// add new properties to user object
			const usr = {
				id: user.uid,
				email: user.email,
				token: user.accessToken,
				imageUrl,
				socialUrl,
				nickname,
				createdAt,
				updatedAt
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

export const logoutUser = (setUser, goTo, setTodos) => {
	signOut(auth)
		// when the result is successful
		.then(() => {
			// update state
			setUser(null);
			// Clearing to dos so the next logged user
			// won't see the previous one
			// otherwise it will be shown for a second
			// before updating
			setTodos([])
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
		nickname,
		createdAt: serverTimestamp(),
	})

	const usr = await getDoc(doc(db, "users", id))

	if (usr.exists()) {
		const { imageUrl, socialUrl, nickname, createdAt } = usr.data()
		return { imageUrl, socialUrl, nickname, createdAt }
	}
	else {
		return null
	}

}

const updateUserColl = async (id) => {
	await updateDoc(doc(db, "users", id), {
		updatedAt: serverTimestamp()
	})

	const usr = await getDoc(doc(db, "users", id))

	if (usr.exists()) {
		const { imageUrl, socialUrl, nickname, createdAt, updatedAt } = usr.data()
		return { imageUrl, socialUrl, nickname, createdAt, updatedAt }
	}
	else {
		return null
	}

}

export const getStoredUser = () => {
	return JSON.parse(localStorage.getItem("todo-user"))
}