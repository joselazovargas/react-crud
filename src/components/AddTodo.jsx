import { useContext, useState } from "react";
import AppContext from "../contextAPI/AppProvider";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../backend/Firebase";

// eslint-disable-next-line react/prop-types
function AddTodo() {
	const {
		text,
		setText,
		handleKeyDown,
		handleAddOrUpdate,
		editingId,
		logout,
	} = useContext(AppContext);

	const [imageUpload, setImageUpload] = useState(null);

	const handleAddorUpdateHandler = () => {
		if (imageUpload) {
			handleAddOrUpdate(imageUpload);
		}
	};

	return (
		<div className="flex mb-10 max-w-full gap-2 py-5 px-7 bg-white rounded-md flex-wrap">
			<input
				onChange={(e) => setText(e.target.value)}
				value={text}
				className="input flex-1"
				type="text"
				placeholder="Enter todo"
				onKeyDown={handleKeyDown}
			/>
			<input
				onChange={(e) => setImageUpload(e.target.files[0])}
				type="file"
				accept="image/png, image/jpeg, image/jpg"
				className="file-input"
			></input>
			<button
				onClick={handleAddorUpdateHandler}
				className="btn btn-primary"
			>
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
