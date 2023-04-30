import "./App.css";

//Libraries imports
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// import Auth from "./components/Auth/Auth";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import useCustomToast from "./helpers/useToast";
import Home from "./pages/Home/Home";

function App() {
	const { ToastComponent } = useCustomToast();
	const router = createBrowserRouter([
		{
			path: "/signup",
			element: <SignUp />,
		},
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/feeds",
			element: <Home />,
		},
		{
			path: "/",
			element: <Navigate to='/feeds' replace />,
		},
	]);

	return (
		<div className='App'>
			<ToastComponent />

			<RouterProvider router={router} />
		</div>
	);
}

export default App;
