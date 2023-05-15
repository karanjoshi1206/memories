import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import ImageUpload from "../ImageUpload/ImageUpload";
import TextInput from "../TextInput/TextInput";
import Styles from "./AddMemory.module.scss";
import FormButton from "../FormButton/FormButton";
import CustomToggle from "../CustomToggle/CustomToggle";
import CustomSelect from "../CustomSelect/CustomSelect";
import { RxCross2 } from "react-icons/rx";
import { getAllUsers } from "../../api/users/users";
const AddMemory = () => {
	const [loading, setLoading] = useState(false);
	const [avatar, setAvatar] = useState(null);
	const schema = Yup.object({
		caption: Yup.string().required("Caption is required"),
		description: Yup.string().required("Description is required"),
		author: Yup.string(),
		// images: Yup.array()
		// 	.min(1, "At least one image is required")
		// 	.max(5, "Maximum of 5 images allowed")
		// 	.of(
		// 		Yup.mixed()
		// 			.test(
		// 				"fileFormat",
		// 				"Unsupported file format",
		// 				(value) =>
		// 					value &&
		// 					["image/jpeg", "image/jpg", "image/png"].includes(value.type)
		// 			)
		// 			.test(
		// 				"fileSize",
		// 				"File size too large",
		// 				(value) => value && value.size <= 5 * 1024 * 1024 // 5MB
		// 			)
		// 	),
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

	const [isPublic, setIsPublic] = useState(true);
	const [userList, setUserList] = useState([
		{
			label: "Karan Joshi",
			value: {
				id: "12as344",
				userName: "Karan Joshi",
				avatar:
					"https://memorybox.fly.dev/api/files/e8ucon8imwkcrkl/2omrqymwpetuv1a/memories_logo_YLELzkTUuG.png?token=",
			},
		},
		{
			label: "Tesst Joshi",
			value: {
				id: "12344",
				userName: "Karan Joshi",
				avatar:
					"https://memorybox.fly.dev/api/files/e8ucon8imwkcrkl/2omrqymwpetuv1a/memories_logo_YLELzkTUuG.png?token=",
			},
		},
		{
			label: "Tesst Joshi",
			value: {
				id: "12k344",
				userName: "Karan Joshi",
				avatar:
					"https://memorybox.fly.dev/api/files/e8ucon8imwkcrkl/2omrqymwpetuv1a/memories_logo_YLELzkTUuG.png?token=",
			},
		},
	]);
	const [taggedUsers, setTaggedUsers] = useState([]);

	const fetchUsers = async () => {
		const response = await getAllUsers();
		console.log("response is ", response);
		setUserList(response.data);
	};
	const addMemory = (values) => {
		setLoading(true);
		alert(values);
		setLoading(false);
	};
	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
			}}>
			<TextInput
				placeholderText='Memory Title (something which represent it best...)'
				value={formik.values.caption}
				setValue={formik.handleChange}
				type='text'
				name='caption'
				labelText='caption'
				errorText={
					formik.touched.caption
						? formik.errors.caption
							? formik.errors.caption
							: null
						: null
				}
				onBlur={formik.handleBlur("caption")}
			/>
			<TextInput
				textArea={true}
				placeholderText='A short description (write it what you feel at that moment)'
				value={formik.values.description}
				setValue={formik.handleChange}
				type='text'
				name='description'
				labelText='description'
				errorText={
					formik.touched.description
						? formik.errors.description
							? formik.errors.description
							: null
						: null
				}
				onBlur={formik.handleBlur("description")}
			/>

			<ImageUpload
				placeholderText='Select image'
				value={avatar}
				setValue={setAvatar}
				type='file'
				name='avatar'
				labelText='avatar'
			/>
			<div className={Styles.privateMemoryContainer}>
				<CustomToggle
					label={"Public Memory ?"}
					value={isPublic}
					setValue={setIsPublic}
				/>
				{!isPublic ? (
					<CustomSelect
						selectedValue={taggedUsers}
						values={userList}
						setValue={setTaggedUsers}
						label='Select users to share'
						multiSelect={true}
					/>
				) : (
					<div className='textDanger'>
						*Memory will be publicly available for everyone
					</div>
				)}
			</div>
			<div className={Styles.taggedUsers}>
				{taggedUsers?.map((elem) => (
					<div key={elem.id} className={Styles.taggedUserContainer}>
						<span>{elem?.userName}</span>
						<RxCross2 />
					</div>
				))}
			</div>
			<div
				style={{
					marginTop: "100px",
				}}>
				<FormButton loading={loading} type='submit' title='Signup' />
			</div>
		</form>
	);
};

export default AddMemory;
