import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import logo from "../../assets/logo.png";
import Styles from "./Navbar.module.scss";

const Navbar = ({ setShowModal }) => {
	const [searchValue, setSearchValue] = useState("");

	return (
		<nav className={Styles.navbar}>
			<h1 className='navTitle'>MEMORYBOX</h1>
			<TextInput
				placeholderText='Search'
				value={searchValue}
				setValue={(e) => setSearchValue(e.target.value)}
			/>
			<button onClick={() => setShowModal(true)}>Create</button>
		</nav>
	);
};

export default Navbar;
