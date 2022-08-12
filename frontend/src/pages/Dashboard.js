import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Dashboard = () => {
	const {user} = useSelector(state => state.userStore);
	const navigate = useNavigate();

	// useEffect(() => {
	//
	// }, []);

	return (
		<div>
			<h1>Welcome, {user && user.username}</h1>
		</div>
	);
};

export default Dashboard;