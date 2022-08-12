import {Routes, Route, useNavigate} from "react-router-dom";
import {routeConfig} from "./config/routeConfig";
import axios from "axios";
import {GlobalStyles} from "./components/GlobalStyles";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
// Components
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navigation from "./components/Navigation";
import {Toaster} from "react-hot-toast";
// Pages
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import UserActivate from "./pages/UserActivate";
import UserProfile from "./pages/UserProfile";
import Shop from "./pages/Shop";
import UserProducts from "./pages/UserProducts";
import Dashboard from "./pages/Dashboard";

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
	// const navigate = useNavigate();
	// const dispatch = useDispatch();
	//
	// useEffect(() => {
	//   loginHandler();
	// }, []);
	//
	// const loginHandler = () => {
	//   if(!localStorage.hasOwnProperty('user')) {
	//     navigate(routeConfig.HOME.url);
	//   } else {
	//     dispatch(setUser(user));
	//   }
	// }

	return (
		<>
			<GlobalStyles/>
			<div className="container">
				<Navigation/>
				<Routes>
					<Route index path={routeConfig.HOME.url} element={<Home/>}/>
					<Route path={routeConfig.AUTH.url} element={<Auth/>}>
						<Route index element={<Login/>}/>
						<Route path={routeConfig.REGISTER.url} element={<Register/>}/>
					</Route>
					<Route path={routeConfig.USER_ACTIVATE.url} element={<UserActivate/>}/>
					<Route path={routeConfig.USER_ACTIVATE.urlID} element={<UserActivate/>}/>
					<Route path={routeConfig.MY_PROFILE.url} element={<UserProfile/>}/>
					<Route path={routeConfig.MY_PRODUCTS.url} element={<UserProducts/>}/>
					<Route path={routeConfig.SHOP.url} element={<Shop/>}/>
					<Route path={routeConfig.DASHBOARD.url} element={<Dashboard/>}/>
				</Routes>
			</div>
			<Toaster/>
		</>
	);
}

export default App;
