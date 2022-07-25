import React, {useState} from 'react';
import AuthHeader from '../components/Auth/AuthHeader';
import { Outlet } from "react-router-dom";
import styled from 'styled-components';

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);
	return(
		<AuthWrapper>
			<AuthHeader isLogin={isLogin} setIsLogin={setIsLogin} />
			<Outlet context={[isLogin, setIsLogin]}/>
		</AuthWrapper>
	)
}

export default Auth;

const AuthWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`