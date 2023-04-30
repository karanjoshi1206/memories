import React from "react";

//styles
import Styles from "./TextInput.module.scss";
const TextInput = ({
	labelText = "",
	value = {},
	type = "text",
	setValue,
	name = "",
	placeholderText = "",
	errorText = "",
	onBlur,
}) => {
	return (
		<div className={Styles.inputContainer}>
			<div className={Styles.textInputWrapper}>
				<input
					className={Styles.textInput}
					placeholder={placeholderText}
					id={name}
					type={type}
					value={value}
					name={name}
					onChange={setValue}
					onBlur={onBlur}
				/>
			</div>
			{errorText && <p className={Styles.errorText}>*{errorText}</p>}
		</div>
	);
};

export default TextInput;
