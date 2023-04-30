import React, { useEffect, useState } from "react";
import pb from "../../db/pocketbase";
const Auth = () => {
	const isLoggedIn = pb.authStore.isValid;
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState({});
	const [memories, setMemories] = useState([]);
	const loginUser = async (e) => {
		try {
			e.preventDefault();
			setLoading(true);
			const authData = await pb
				.collection("users")
				.authWithPassword(email, password);
			console.log(authData.record);
			localStorage.setItem("user", JSON.stringify(authData.record));
			setUser(authData.record);
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};
	const signUpUser = async (e) => {
		const data = {
			username: "",
			email: email,
			emailVisibility: true,
			password: password,
			passwordConfirm: password,
			name: "test",
		};
		try {
			e.preventDefault();
			setLoading(true);
			const authData = await pb.collection("users").create(data);
			console.log(authData);
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	const getImagesList = async () => {
		const userId = JSON.parse(localStorage.getItem("user")).id;
		const filter = `userId = "${userId}"`;
		try {
			const resultList = await pb.collection("memories").getFullList({
				filter: filter,
			});
			console.log("==>", resultList);
			setMemories(resultList);
		} catch (error) {
			console.log(error);
		}
	};

	const logOut = () => {
		pb.authStore.clear();
	};
	useEffect(() => {
		if (isLoggedIn) getImagesList();
		else return;
	}, [isLoggedIn]);
	return (
		<div>
			{isLoggedIn && pb.authStore.model.email}
			{loading && <p>loading....</p>}
			<form>
				<input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Email'
				/>
				<input
					type='text'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='password'
				/>
				<button onClick={(e) => loginUser(e)} disabled={loading} type='submit'>
					{loading ? "loading... " : "submit"}
				</button>
				<button onClick={(e) => signUpUser(e)} disabled={loading} type='submit'>
					{loading ? "loading... " : "Signup"}
				</button>
			</form>
			<button onClick={() => logOut()}>logout</button>

			<div>
				Memories list::
				{memories.map((elem) => {
					return (
						<div
							style={{
								margin: "10px",
								backgroundColor: "lightblue",
								width: "400px",
								padding: "30px",
							}}>
							<li>{elem.about}</li>
							<li>{elem.caption}</li>
							<img
								style={{
									objectFit: "cover",
								}}
								src={`http://127.0.0.1:8090/api/files/${elem.collectionId}/${elem.id}/${elem.image[0]}`}
								alt=''
								height={200}
								width={200}
							/>
							<li>{elem.about}</li>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Auth;
