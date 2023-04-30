import "./App.css";

//Libraries imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Auth from "./components/Auth/Auth";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Auth from "./pages/Auth/Auth";

function App() {
	const router = createBrowserRouter([
		{
			path: "/signup",
			element: <Auth />,
		},
		{
			path: "/login",
			element: <Login />,
		},
	]);

	return (
		<div className='App'>
			{/* <Auth /> */}

			<RouterProvider router={router} />
		</div>
	);
}

export default App;
