import React, {useState} from "react";
import styled from 'styled-components';
import {Link, useOutletContext} from 'react-router-dom';
// Bootstrap components
import {FloatingLabel, Form} from 'react-bootstrap'

// Custom components
import PrimaryBtn from '../PrimaryBtn';

const Login = () => {
  const [isLogin] = useOutletContext();
  const [formData, setFormData] = useState({
     username: '',
     password: '',
  })

  const loginInputHandler = (e) => {

  }

  return (
    <FormWrapper className="mx-auto">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={loginInputHandler} />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" name="password" onChange={loginInputHandler} />
        </FloatingLabel>
      </Form.Group>
      {isLogin &&
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
          <Link to="/password-reset" className="mt-3">Forgot your password?</Link>
        </Form.Group>
      }
      <div className="d-block w-100">
        <PrimaryBtn variant="primary" type="submit" buttonText="Login" />
      </div>
    </FormWrapper>
  )
};

export default Login;

const FormWrapper = styled.div`
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
  @media (min-width: 768px) {
    width: 25%;
  }
`