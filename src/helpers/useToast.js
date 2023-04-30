import { toast, ToastContainer } from "react-toastify";

const useCustomToast = (
	toastStyle = {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
	}
) => {
	const successToast = (msg = "Success.") => toast.success(msg, toastStyle);
	const errorToast = (msg = "Oops ! Something went wrong.") =>
		toast.error(msg, toastStyle);

	return { successToast, errorToast, ToastComponent };
};

export default useCustomToast;

const ToastComponent = () => {
	return (
		<ToastContainer
			position='top-center'
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme='dark'
		/>
	);
};
