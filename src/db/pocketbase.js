import PocketBase from "pocketbase";
const pb = new PocketBase(process.env.REACT_APP_POCKETBASE_URI);
export default pb;
