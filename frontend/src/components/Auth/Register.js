import React, {useState} from "react";
import styled from 'styled-components';
import {useOutletContext} from 'react-router-dom';
// Bootstrap components
import {FloatingLabel, Form} from 'react-bootstrap'

// Custom components
import PrimaryBtn from '../PrimaryBtn';

const Login = () => {
	const [isLogin] = useOutletContext();
	const [formData, setFormData] = useState({
																						 username: '',
																						 email: '',
																						 password: '',
																						 repeatPassword: ''
																					 })

	const {username, email, password, repeatPassword} = formData;

	const inputChangeHandler = (e) => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const formSubmitHandler = (e) => {
		e.preventDefault();
	}

	return (
		<FormWrapper className="mx-auto" onSubmit={formSubmitHandler}>
			<Form.Group className="mb-3" controlId="username">
				<FloatingLabel
					controlId="username"
					label="Username"
					className="mb-3"
				>
					<Form.Control id="username" type="text" placeholder="Username" name="username" onChange={inputChangeHandler}/>
				</FloatingLabel>
			</Form.Group>

			<Form.Group className="mb-3" controlId="email">
				<FloatingLabel controlId="email" label="Email">
					<Form.Control id="email" type="email" placeholder="Email" name="email" onChange={inputChangeHandler}/>
				</FloatingLabel>
			</Form.Group>

			<Form.Group className="mb-3" controlId="password">
				<FloatingLabel controlId="password" label="Password">
					<Form.Control id="password"
												type="password"
												placeholder="Password"
												name="password"
												onChange={inputChangeHandler}/>
				</FloatingLabel>
			</Form.Group>

			<Form.Group className="mb-3" controlId="repeatPassword">
				<FloatingLabel controlId="repeatPassword" label="Repeat password">
					<Form.Control id="repeatPassword"
												type="password"
												placeholder="Repeat password"
												name="repeatPassword"
												onChange={inputChangeHandler}/>
				</FloatingLabel>
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