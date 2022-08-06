import React, {useState} from "react";
import styled from 'styled-components';
import {Link, useNavigate, useOutletContext} from 'react-router-dom';
import {useDispatch} from "react-redux";
import UserService from "../../services/userService";
import {setUser} from "../../redux/userSlice";
// Bootstrap components
import {FloatingLabel, Form} from 'react-bootstrap'
// Components
import PrimaryBtn from '../PrimaryBtn';
import toast, {Toaster} from "react-hot-toast";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin] = useOutletContext();
  const [userData, setUserData] = useState({
     username: '',
     password: '',
  })
  const {username, password} = userData;

  const [isFormValid, setIsFormValid] = useState(true);

  const inputChangeHandler = (e) => {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(!username || !password) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);

    UserService.login(userData)
      .then(res => {
        if(res && res.status === 200) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('token', JSON.stringify(res.data.token));
          dispatch(setUser(res.data.user));
        } else {
          toast.success(res.data);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <FormWrapper className="mx-auto" onSubmit={formSubmitHandler} method="post">
      <Form.Group className="mb-3" controlId="username">
        <FloatingLabel
          controlId="floatingInput"
          label="Username"
          className="mb-3"
        >
          <Form.Control type="text" placeholder="Username" name="username" onChange={inputChangeHandler} />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" name="password" onChange={inputChangeHandler} />
        </FloatingLabel>
      </Form.Group>
      {isLogin &&
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
          <Link to="/password-reset" className="mt-3">Forgot your password?</Link>
        </Form.Group>
      }
      <div className="d-block w-100">
        <PrimaryBtn variant="primary" buttonText="Login" />
      </div>
      <Toaster/>
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