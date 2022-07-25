import React from 'react';
import styled from 'styled-components';
import {FiLogIn} from 'react-icons/fi'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {Link} from 'react-router-dom';
import {routeConfig} from "../../config/routeConfig";

const AuthHeader = ({isLogin, setIsLogin}) => {
	return(
		<AuthHeaderWrapper>
			<div className="header">
				{isLogin ? <FiLogIn  className="icon" /> :
					<AiOutlineUserAdd className="icon" />
				}
				<h2 className="fw-bold my-3">
					{isLogin ? 'Login to your account' : 'Create your account'}
				</h2>
				<p>
					{isLogin ? 'Don\'t have an account yet?' : 'Already have an account?'}
					<span className="login-register ms-1" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ?
							<Link to={routeConfig.REGISTER.url}>Register</Link> :
							<Link to="">Login</Link>
						}
          </span>
				</p>
			</div>
		</AuthHeaderWrapper>
	)
}

export default AuthHeader;

const AuthHeaderWrapper = styled.div`
  .header {
    text-align: center;
    .icon {
      font-size: 3rem;
      width: 100%;
      margin: 0 auto;
    }
    .login-register {
      a {
        color: #805ad5;
        text-decoration: none;
        font-weight: 500;
      }
    }
  }
`