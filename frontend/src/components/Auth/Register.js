import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from 'styled-components';
import {useOutletContext, useNavigate} from 'react-router-dom';
import {register, reset} from "../../redux/userSlice";
import {routeConfig} from "../../config/routeConfig";
// Bootstrap components
import {FloatingLabel, Form} from 'react-bootstrap'
// Custom components
import PrimaryBtn from '../PrimaryBtn';
import Loader from '../../components/Loader';
// Notifications
import toast from 'react-hot-toast';

const Register = () => {
	const [isLogin] = useOutletContext();
	const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.userStore);
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		password: ''
	})
	const {username, email, password} = userData;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const [isFormValid, setIsFormValid] = useState(true);
	// const [emptyForm, setIsEmptyForm] = useState(false);
	// const [success, setSuccess] = useState(false);

	useEffect(() => {
		if(isError) {
			toast.error(message);
		}

		if(isSuccess || user) {
			toast.success(message);
			navigate(routeConfig.USER_ACTIVATE.url);
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const inputChangeHandler = (e) => {
		setUserData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const formSubmitHandler = (e) => {
		e.preventDefault();

		if (!username || !email || !password) {
			toast.error('Please fill all required fields.');
		} else if(!email.includes('@')) {
			toast.error('Please enter valid email.');
		} else {
			const userData = {
				username,
				email,
				password
			}

			dispatch(register(userData));
		}
	}

	if(isLoading) {
		return <Loader />
	}

	return (
		<FormWrapper className="mx-auto" onSubmit={formSubmitHandler}>
			<Form.Group className="mb-3" controlId="username">
				<FloatingLabel
					controlId="username"
					label="* Username"
				>
					<Form.Control type="text" placeholder="Username" name="username" onChange={inputChangeHandler}/>
				</FloatingLabel>
				{/*{emptyForm &&*/}
				{/*	<Form.Text className="text-danger">*/}
				{/*		Required field.*/}
				{/*	</Form.Text>*/}
				{/*}*/}
			</Form.Group>

			<Form.Group className="mb-3" controlId="email">
				<FloatingLabel controlId="email" label="* Email">
					<Form.Control type="email" placeholder="Email" name="email" onChange={inputChangeHandler}/>
				</FloatingLabel>
				{/*{emptyForm &&*/}
				{/*	<Form.Text className="text-danger">*/}
				{/*		Required field.*/}
				{/*	</Form.Text>*/}
				{/*}*/}
			</Form.Group>

			<Form.Group className="mb-3" controlId="password">
				<FloatingLabel controlId="password" label="* Password">
					<Form.Control type="password"
												placeholder="Password"
												name="password"
												onChange={inputChangeHandler}/>
				</FloatingLabel>
				{/*{emptyForm &&*/}
				{/*	<Form.Text className="text-danger">*/}
				{/*		Required field.*/}
				{/*	</Form.Text>*/}
				{/*}*/}
			</Form.Group>

			{isLogin &&
				<Form.Group className="mb-3" controlId="rememberMe">
					<Form.Check type="checkbox" label="Remember me"/>
					<p className="mt-3">Forgot your password?</p>
				</Form.Group>
			}
			<div className="d-block w-100">
				<PrimaryBtn variant="primary" type="submit" buttonContent="Register"/>
			</div>
		</FormWrapper>
	)
};

export default Register;

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