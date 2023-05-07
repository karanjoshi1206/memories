import React from "react";

//styles
import Styles from "./TextInput.module.scss";
const TextInput = ({
	labelText = "",
	value = "",
	type = "text",
	setValue = () => {},
	name = "",
	placeholderText = "",
	errorText = "",
	onBlur,
	textArea = false,
}) => {
	return (
		<div className={Styles.inputContainer}>
			<div className={Styles.textInputWrapper}>
				{textArea ? (
					<textarea
						rows='4'
						cols='50'
						className={`${Styles.textInput} ${Styles.textArea}`}
						placeholder={placeholderText}
						id={name}
						type={type}
						value={value}
						name={name}
						onChange={setValue}
						onBlur={onBlur}
					/>
				) : (
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
				)}
			</div>
			{errorText && <p className={Styles.errorText}>*{errorText}</p>}
		</div>
	);
};

export default TextInput;
