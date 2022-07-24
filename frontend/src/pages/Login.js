import React from "react";
import styled from 'styled-components';
// Bootstrap components
import {Container, Row, Col, Form, FloatingLabel} from 'react-bootstrap';

// Custom components
import PrimaryBtn from '../components/PrimaryBtn';

// Icons;
import {FiLogIn} from "react-icons/fi";

const Login = () => {
  return (
    <LoginWrapper>
      <Container>
        <Row>
          <Col md={6} className="mx-auto">
            <div className="header">
              <FiLogIn className="icon" />
              <h2 className="text-center fw-bold my-3">Login to your account</h2>
              <p className="text-center">Don't have an account yet? <span className="register">Register</span></p>
            </div>

            <Form className="w-75 mx-auto">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control type="email" placeholder="Enter email" />
                </FloatingLabel>
                {/* Error */}
                {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                {/* <Form.Label>Password</Form.Label> */}
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
                <p className="mt-3">Forgot your password?</p>
              </Form.Group>
              <div className="d-flex w-100 justify-content-center">
                <PrimaryBtn variant="primary" type="submit" width="w-100" buttonText="Login" />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </LoginWrapper>
  )
};

export default Login;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    .icon {
      font-size: 3rem;
      width: 100%;
      margin: 0 auto;
    }
    .register {
      color: red;
    }
  }
`