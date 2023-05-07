import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import ImageUpload from "../ImageUpload/ImageUpload";
import TextInput from "../TextInput/TextInput";
import Styles from "./AddMemory.module.scss";
import FormButton from "../FormButton/FormButton";
import CustomToggle from "../CustomToggle/CustomToggle";
import CustomSelect from "../CustomSelect/CustomSelect";
const AddMemory = () => {
	const [loading, setLoading] = useState(false);
	const [avatar, setAvatar] = useState(null);
	const schema = Yup.object({
		email: Yup.string()
			.email("Invalid Email Address")
			.required("Email is required"),
		username: Yup.string(),
		name: Yup.string().required("Name is required"),
		password: Yup.string().min(8).required("Password is required"),
		confirmPassword: Yup.string()
			.label("confirm password")
			.required("Confirm Password is required")
			.oneOf([Yup.ref("password"), null], "Passwords must match"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			name: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: schema,
		onSubmit: async (values) => {
			addMemory(values);
		},
	});

	const addMemory = (values) => {
		alert(values);
	};
	return (
		<form
			// className={Styles.formContainer}
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
			}}>
			<TextInput
				placeholderText='Memory Title (something which represent it best...)'
				value={formik.values.name}
				setValue={formik.handleChange}
				type='text'
				name='name'
				labelText='Name'
				errorText={
					formik.touched.name
						? formik.errors.name
							? formik.errors.name
							: null
						: null
				}
				onBlur={formik.handleBlur("name")}
			/>
			<TextInput
				textArea={true}
				placeholderText='A short description (write it what you feel at that moment)'
				value={formik.values.email}
				setValue={formik.handleChange}
				type='email'
				name='email'
				labelText='Email'
				errorText={
					formik.touched.email
						? formik.errors.email
							? formik.errors.email
							: null
						: null
				}
				onBlur={formik.handleBlur("email")}
			/>
			<TextInput
				placeholderText='Enter your username'
				value={formik.values.username}
				setValue={formik.handleChange}
				type='text'
				name='username'
				labelText='Username'
				errorText={
					formik.touched.username
						? formik.errors.username
							? formik.errors.username
							: null
						: null
				}
			/>

			<ImageUpload
				placeholderText='Select image'
				value={avatar}
				setValue={setAvatar}
				type='file'
				name='avatar'
				labelText='avatar'
			/>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "30px",
					margin: "10px 0",
				}}>
				<CustomToggle />
				<CustomSelect />
			</div>
			<div
				style={{
					marginTop: "100px",
				}}>
				<FormButton loading={loading} type='submit' title='Signup' />
			</div>
			{/* <button> Signup</button> */}
		</form>
	);
};

export default AddMemory;
