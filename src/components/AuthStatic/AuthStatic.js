import React from "react";

//styles
import Styles from "./AuthStatic.module.scss";

// assets
import joinUs1 from "../../assets/joinUs1.jpg";
import joinUs2 from "../../assets/joinUs2.jpg";
import joinUs3 from "../../assets/joinUs3.jpg";
const AuthStatic = () => {
	return (
		<div className={Styles.authLeft}>
			<img className={Styles.img1} src={joinUs1} alt='' />
			<img className={Styles.img2} src={joinUs2} alt='' />
			<img className={Styles.img3} src={joinUs3} alt='' />
			<h1 className={Styles.authTitle}>
				<span>M</span>
				<span>E</span>
				<span>M</span>
				<span>O</span>
				<span>R</span>
				<span>Y</span>
				<span>B</span>
				<span>O</span>
				<span>X</span>
			</h1>
			<p>Share Life's Best</p>
		</div>
	);
};

export default AuthStatic;
