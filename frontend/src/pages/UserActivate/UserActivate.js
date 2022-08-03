import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {routeConfig} from "../../config/routeConfig";
import UserService from "../../services/userService";

const UserActivate = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [isActivated, setIsActivated] = useState(false);
	const [isApiFinished, setIsApiFinished] = useState(false);

	useEffect(() => {
		if(localStorage.hasOwnProperty('user')) {
			navigate(routeConfig.HOME.url);
		}else {
			UserService.completeRegistration({userID: params.id})
				.then(res => {
					if(res) {
						setIsActivated(true);
						setTimeout(() => {
							navigate(routeConfig.AUTH.url);
						}, 3000)
					}
				})
				.catch(error => {{
					console.log(error);
					setIsActivated(false);
				}})
				.finally(() => {
					setIsApiFinished(true);
				})
		}
	}, [])

	const successLayout = () => {
		return params?.id ?
			<p>Successfully activated. <br/> Redirecting to login page...</p> :
			<p>User not activated.</p>
	}

	const registrationSuccessLayout = () => {
		return !params?.id ?
			<>
				<h1>Your registration is successful</h1>
				<p>An email has been sent to your email address containing an activation link. Please click on the link to activate your account.</p>
			</> : null
	}

	return (
		<>
			{registrationSuccessLayout()}
			{isApiFinished && successLayout()}
		</>
	);
};

export default UserActivate;