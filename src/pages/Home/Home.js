import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TextInput from "../../components/TextInput/TextInput";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/Modal/Modal";
import AddMemory from "../../components/AddMemory/AddMemory";
const Home = () => {
	const checkUserLoggedIn = localStorage.getItem("user");
	const navigate = useNavigate();
	// console.log(checkUserLoggedIn);
	useEffect(() => {
		// if (checkUserLoggedIn == null) {
		// 	localStorage.clear();
		// 	navigate("/signup");
		// }
	}, [checkUserLoggedIn, navigate]);
	const [createModal, setCreateModal] = useState(false);

	return (
		<div>
			<Navbar setShowModal={setCreateModal} />
			{createModal && (
				<Modal title='Add memory' setShowModal={setCreateModal}>
					<AddMemory />
				</Modal>
			)}
		</div>
	);
};

export default Home;
