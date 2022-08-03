import React, {useState} from "react";
import styled from 'styled-components';
import {useOutletContext, useNavigate} from 'react-router-dom';
// Bootstrap components
import {FloatingLabel, Form} from 'react-bootstrap'
// Custom components
import PrimaryBtn from '../PrimaryBtn';
// Notifications
import toast, {Toaster} from 'react-hot-toast';
import UserService from "../../services/userService";
import {routeConfig} from "../../config/routeConfig";

const Login = () => {
	const [isLogin] = useOutletContext();
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		password: ''
	})
	const [isFormValid, setIsFormValid] = useState(true);
	const [emptyForm, setIsEmptyForm] = useState(false);
	const [success, setSuccess] = useState(false);

	const {username, email, password} = userData;

	const navigate = useNavigate();

	const inputChangeHandler = (e) => {
		setUserData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const formSubmitHandler = (e) => {
		e.preventDefault();

		if (!username || !email || !email.includes('@') || !password) {
			setIsFormValid(false);
			setIsEmptyForm(true);
			toast.error("Please fill required fields.");
			return;
		}
		setIsFormValid(true);

		UserService.register(userData)
			.then(res => {
				if (res && res.status === 200) {
					console.log(res);
					setSuccess(true);
					toast.success('Successfully registered!');
					setTimeout(() => {
						navigate(routeConfig.USER_ACTIVATE.url);
					}, 2000)
				}
			})
			.catch(error => {
				console.log(error);
				toast.error("User already exists.");
			})
	}

	return (
		<FormWrapper className="mx-auto" onSubmit={formSubmitHandler}>
			<Form.Group className="mb-3" controlId="username">
				<FloatingLabel
					controlId="username"
					label="Username"
				>
					<Form.Control type="text" placeholder="Username" name="username" className={emptyForm ? 'border-danger' : ''}
												onChange={inputChangeHandler}/>
				</FloatingLabel>
				{emptyForm &&
					<Form.Text className="text-danger">
						Required field.
					</Form.Text>
				}
			</Form.Group>

			<Form.Group className="mb-3" controlId="email">
				<FloatingLabel controlId="email" label="Email">
					<Form.Control type="email" placeholder="Email" name="email" className={emptyForm ? 'border-danger' : ''}
												onChange={inputChangeHandler}/>
				</FloatingLabel>
				{emptyForm &&
					<Form.Text className="text-danger">
						Required field.
					</Form.Text>
				}
			</Form.Group>

			<Form.Group className="mb-3" controlId="password">
				<FloatingLabel controlId="password" label="Password">
					<Form.Control className={emptyForm ? 'border-danger' : ''}
												type="password"
												placeholder="Password"
												name="password"
												onChange={inputChangeHandler}/>
				</FloatingLabel>
				{emptyForm &&
					<Form.Text className="text-danger">
						Required field.
					</Form.Text>
				}
			</Form.Group>

			{isLogin &&
				<Form.Group className="mb-3" controlId="rememberMe">
					<Form.Check type="checkbox" label="Remember me"/>
					<p className="mt-3">Forgot your password?</p>
				</Form.Group>
			}
			<div className="d-block w-100">
				<PrimaryBtn variant="primary" type="submit" buttonText="Register"/>
			</div>
			<Toaster/>
		</FormWrapper>
	)
};

export default Login;

const FormWrapper = styled.form`
  width: 75%;

  button {
    width: 100%;
    @media (min-width: 576px) {
      width: auto;
    }
  }

  @media (min-width: 992px) {
    width: 25%;
  }
`