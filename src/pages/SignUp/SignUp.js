import React, { useState } from "react";

//styles
import Styles from "./SignUp.module.scss";

//assets
import logo from "../../assets/logo.png";

//libraries
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

//components
import TextInput from "../../components/TextInput/TextInput";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import AuthStatic from "../../components/AuthStatic/AuthStatic";
import FormButton from "../../components/FormButton/FormButton";

//pocketbase
import pb from "../../db/pocketbase";
import useCustomToast from "../../helpers/useToast";

const SignUp = () => {
	const navigate = useNavigate();
	const { successToast, errorToast } = useCustomToast();
	const [loading, setLoading] = useState(false);
	const [avatar, setAvatar] = useState(undefined);
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
			signUpUser(values);
		},
	});

	const signUpUser = async (values) => {
		const data = {
			username: values.username,
			email: values.email,
			emailVisibility: true,
			password: values.password,
			passwordConfirm: values.confirmPassword,
			name: values.name,
		};
		try {
			setLoading(true);
			const authData = await pb.collection("users").create(data);
			console.log(authData);
			successToast("Registered Successfully");
			navigate("/feeds");
		} catch (error) {
			if (error.response) {
				const firstKey = Object.keys(error.response.data)[0];
				errorToast(error.response.data[firstKey].message);
			} else {
				errorToast(error.message);
			}
		}
	};

	return (
		<div className={Styles.authContainer}>
			<AuthStatic />
			<div className={Styles.authRight}>
				<div className={Styles.logoContainer}>
					<img className={Styles.logo} src={logo} alt='Memories' />
				</div>
				<form
					className={Styles.formContainer}
					onSubmit={(e) => {
						e.preventDefault();
						formik.handleSubmit();
					}}>
					<TextInput
						placeholderText='Enter your name'
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
						placeholderText='Enter your email'
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
					<TextInput
						placeholderText='Enter your password'
						value={formik.values.password}
						setValue={formik.handleChange}
						type='password'
						name='password'
						labelText='password'
						errorText={
							formik.touched.password
								? formik.errors.password
									? formik.errors.password
									: null
								: null
						}
						onBlur={formik.handleBlur("password")}
					/>
					<TextInput
						placeholderText='Enter your confirmPassword'
						value={formik.values.confirmPassword}
						setValue={formik.handleChange}
						type='password'
						name='confirmPassword'
						labelText='confirmPassword'
						errorText={
							formik.touched.confirmPassword
								? formik.errors.confirmPassword
									? formik.errors.confirmPassword
									: null
								: null
						}
						onBlur={formik.handleBlur("confirmPassword")}
					/>
					<ImageUpload
						placeholderText='Enter Your Avatar Image'
						value={avatar}
						setValue={setAvatar}
						type='file'
						name='avatar'
						labelText='avatar'
					/>
					<FormButton loading={loading} type='submit' title='Signup' />
					{/* <button> Signup</button> */}
				</form>
				<p className={Styles.bottomText}>
					<span>Already have account?</span>
					<Link to={"/login"}>Login</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
