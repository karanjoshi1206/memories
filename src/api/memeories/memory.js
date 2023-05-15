import pb from "../../db/pocketbase";

const createMemory = async (data = {}) => {
	if (data) {
		try {
			const response = await pb.collection("memories").create(data);
			return {
				status: true,
				data: response,
			};
		} catch (error) {
			return {
				status: false,
				message: error,
			};
		}
	} else {
		return {
			status: false,
			message: "No Data sent",
		};
	}
};
const getMemory = () => {};
const deleteMemory = () => {};
const getAllMemories = () => {};
const updateMemory = () => {};

export { createMemory, getAllMemories, getMemory, deleteMemory, updateMemory };

// import PocketBase from 'pocketbase';

// const pb = new PocketBase('https://memorybox.fly.dev');

// ...

// // example create data
// const data = {
//     "caption": "test",
//     "description": "test",
//     "likes": [
//         "RELATION_RECORD_ID"
//     ],
//     "visibility": true,
//     "taggedUser": [
//         "RELATION_RECORD_ID"
//     ],
//     "author": "RELATION_RECORD_ID"
// };

// const record = await pb.collection('memories').create(data);
