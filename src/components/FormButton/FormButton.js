import React from "react";

//styles
import Styles from "./FormButton.module.scss";

const FormButton = ({
	title = "",
	onClick = () => {},
	loading = false,
	disabled = false,
	type = "button",
}) => {
	return (
		<button
			type={type}
			className={Styles.formButton}
			onClick={onClick}
			disabled={loading}>
			{title}
		</button>
	);
};

export default FormButton;
