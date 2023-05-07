import React, { useState } from "react";

//styles
import Styles from "../SignUp/SignUp.module.scss";

//assets
import logo from "../../assets/logo.png";

//libraries
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

// components
import AuthStatic from "../../components/AuthStatic/AuthStatic";
import TextInput from "../../components/TextInput/TextInput";
import FormButton from "../../components/FormButton/FormButton";
import useCustomToast from "../../helpers/useToast";
import pb from "../../db/pocketbase";

const Login = () => {
	const { successToast, errorToast } = useCustomToast();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const schema = Yup.object({
		email: Yup.string().required("Email/username is required"),

		password: Yup.string().min(8).required("Password is required"),
	});
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: schema,
		onSubmit: async (values) => {
			loginUser(values);
		},
	});

	const loginUser = async (values) => {
		try {
			setLoading(true);
			const authData = await pb
				.collection("users")
				.authWithPassword(values.email, values.password);
			console.log(authData.record);
			localStorage.setItem("user", JSON.stringify(authData.record));
			successToast("Logged in Successfully");
			setLoading(false);
			navigate("/feeds");
		} catch (error) {
			console.log("err ", error);
			errorToast(error.message);
			setLoading(false);
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
						placeholderText='Enter your email or username'
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

					{/* <button className={Styles.submitButton}> Login</button> */}
					<FormButton type='submit' loading={loading} title='Login' />
					<p className={Styles.bottomText}>
						<span>Don't have account?</span>
						<Link to={"/signUp"}>Signup</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
