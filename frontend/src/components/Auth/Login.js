import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import {Link, useNavigate, useOutletContext} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {routeConfig} from "../../config/routeConfig";
import {login, reset} from "../../redux/userSlice";
// Bootstrap components
import {FloatingLabel, Form} from 'react-bootstrap'
// Components
import PrimaryBtn from '../PrimaryBtn';
import toast from "react-hot-toast";
import Loader from "../Loader";


const Login = () => {
  const [isLogin] = useOutletContext();
  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.userStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const { email, password} = userData;


  useEffect(() => {
    if(isError) {
      toast.error(message);
    }

    if(isSuccess || user) {
      toast.success(`Welcome!`);
      navigate(routeConfig.HOME.url);
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

    const userData = {
      email,
      password,
    }

    dispatch(login(userData));
  }

  if(isLoading) {
    return <Loader />;
  }

  const rememberMeHandler = () => {

  }

  return (
    <FormWrapper className="mx-auto" onSubmit={formSubmitHandler} method="post">
      <Form.Group className="mb-3" controlId="email">
        <FloatingLabel
          controlId="floatingInput"
          label="* Email"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="Email" name="email" onChange={inputChangeHandler} />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <FloatingLabel controlId="floatingPassword" label="* Password">
          <Form.Control type="password" placeholder="Password" name="password" onChange={inputChangeHandler} />
        </FloatingLabel>
      </Form.Group>
      {isLogin &&
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" onChange={rememberMeHandler} />
          <Link to="/password-reset" className="mt-3">Forgot your password?</Link>
        </Form.Group>
      }
      <div className="d-block w-100">
        <PrimaryBtn variant="primary" buttonContent="Login" />
      </div>
    </FormWrapper>
  )
};

export default Login;

const FormWrapper = styled.form`
  width: 75%;
  a {
    text-decoration: none;
    color: #6b46c1;
    font-weight: 500;
  }
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