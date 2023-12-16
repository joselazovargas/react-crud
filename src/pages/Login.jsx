import { useContext, useEffect, useState } from "react";
import AppContext from "../contextAPI/AppProvider";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [socialUrl, setSocialUrl] = useState("");
	const [nickname, setNickname] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const { register, login } = useContext(AppContext);
	const goTo = useNavigate();

	useEffect(() => {
		const usr = JSON.parse(localStorage.getItem("todo-user"));
		if (usr) goTo("/todos");
	}, []);

	const handleRegister = () => {
		if (!email || !password) return alert("feilds must be filled!");

		if (password !== confirmPassword) return alert("Passwords must match!");

		register(email, password, imageUrl, socialUrl, nickname);
		reset();
	};

	const handleLogin = () => {
		login(email, password);
		reset();
	};

	const reset = () => {
		setEmail("");
		setPassword("");
		setConfirmPassword("");
	};

	return (
		<div className="flex flex-col w-[500px] mb-10 max-w-full gap-2 py-5 px-7 bg-white rounded-md">
			<h1 className="text-center">Authentication</h1>
			<input
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				className="input flex-1 p-5"
				type="email"
				placeholder="Enter email"
			/>
			<input
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				className="input flex-1 p-5"
				type="password"
				placeholder="Enter Password"
			/>
			{!isLogin && (
				<>
					<input
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword}
						className="input flex-1 p-5"
						type="password"
						placeholder="Confirm Password"
					/>
					<input
						onChange={(e) => setImageUrl(e.target.value)}
						value={imageUrl}
						className="input flex-1 p-5"
						type="text"
						placeholder="Enter image Url"
					/>
					<input
						onChange={(e) => setSocialUrl(e.target.value)}
						value={socialUrl}
						className="input flex-1 p-5"
						type="text"
						placeholder="Enter social Url"
					/>
					<input
						onChange={(e) => setNickname(e.target.value)}
						value={nickname}
						className="input flex-1 p-5"
						type="text"
						placeholder="Enter nickname"
					/>
				</>
			)}

			<button
				onClick={() => (isLogin ? handleLogin() : handleRegister())}
				className="btn btn-primary"
			>
				{isLogin ? "Login" : "Register"}
			</button>
			<button
				onClick={() => setIsLogin(!isLogin)}
				className="btn btn-secondary"
			>
				{isLogin ? "Register" : "Login"} Instead
			</button>
		</div>
	);
}

export default Login;
