import pb from "../../db/pocketbase";

const registerUser = () => {};
const getUser = () => {};
const updateUser = () => {};
const loginUser = () => {};
const getAllUsers = async () => {
	try {
		const records = await pb.collection("users").getFullList({
			sort: "-created",
		});

		return { status: true, data: records };
	} catch (error) {
		console.log("error is ", error);
		return { status: false, message: error };
	}
};

export { registerUser, getUser, updateUser, loginUser, getAllUsers };
