import React from "react";

const Home = () => {
	const checkUserLoggedIn = localStorage.getItem("user");
	console.log(JSON.parse(checkUserLoggedIn));
	return <div>Home</div>;
};

export default Home;
