import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

// Auth
import Login from "./pages/Auth/Login";

import AdminRoute from "./pages/Admin/AdminRoute";
import Profile from "./pages/User/Profile";
import UserList from "./pages/Admin/UserList";
import Register from "./pages/Auth/Register";
import CategoryList from "./pages/Admin/CategoryList";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			{/* Registered users */}
			<Route path="" element={<PrivateRoute />}>
				<Route path="/profile" element={<Profile />} />
			</Route>

			<Route path="/admin" element={<AdminRoute />}>
				<Route path="/userlist" element={<UserList />} />
				<Route path="/categorylist" element={<CategoryList />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
