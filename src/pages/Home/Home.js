import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const checkUserLoggedIn = localStorage.getItem("user");
	const navigate = useNavigate();
	// console.log(checkUserLoggedIn);
	useEffect(() => {
		if (checkUserLoggedIn == null) {
			localStorage.clear();
			navigate("/signup");
		}
	}, [checkUserLoggedIn, navigate]);
	return <div>Still in development</div>;
};

export default Home;
