import React, { useRef, useState } from "react";
import Styles from "./ImageUpload.module.scss";
const ImageUpload = ({
	labelText = "",
	value = "",
	type = "text",
	setValue = () => {},
	name = "",
	placeholderText = "",
	errorText = "",
	onBlur = () => {},
}) => {
	const [previewSource, setPreviewSource] = useState(null);

	const inputRef = useRef(null);
	const handleFileUpload = () => {
		inputRef.current.click();
	};
	// const handleFileUpload = (event) => {
	// 	const file = event.target.files[0];
	// 	console.log(file);
	// 	setValue(file);
	// };

	const handleChange = (event) => {
		const file = event.target.files[0];
		previewFile(file);
		setValue(file);
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	return (
		<div className={Styles.imageUploadContainer}>
			{/* <label htmlFor={name}>{labelText}</label> */}
			<div
				onClick={() => {
					handleFileUpload();
				}}
				className={Styles.fileContainer}>
				{previewSource && (
					<img
						src={previewSource}
						alt='Avatar'
						className={Styles.previewAvatar}
					/>
				)}

				<p>Select Avatar </p>
			</div>
			<input
				hidden
				type='file'
				id='file'
				name='file'
				onChange={handleChange}
				ref={inputRef}
			/>
			{/* <input type='file' id='file' name='file' onChange={handleFileUpload} /> */}
		</div>
	);
};

export default ImageUpload;
