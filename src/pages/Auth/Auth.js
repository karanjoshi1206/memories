import React, { useState } from "react";
import Styles from "./Auth.module.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import TextInput from "../../components/TextInput/TextInput";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

//assets
import joinUs1 from "../../assets/joinUs1.jpg";
import joinUs2 from "../../assets/joinUs2.jpg";
import joinUs3 from "../../assets/joinUs3.jpg";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const SignUp = () => {
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
			console.log("values ", values, avatar);
		},
	});

	const [avatar, setAvatar] = useState(undefined);
	return (
		<div className={Styles.authContainer}>
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
					<span>I</span>
					<span>E</span>
					<span>S</span>
				</h1>
				<p>Share Life's Best</p>
			</div>
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
						// errorText={
						// 	formik.touched.avatar
						// 		? formik.errors.avatar
						// 			? formik.errors.avatar
						// 			: null
						// 		: null
						// }
					/>

					<button className={Styles.submitButton}> Button</button>
					<p className={Styles.bottomText}>
						<span>Already have account?</span>
						<Link>Login</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
