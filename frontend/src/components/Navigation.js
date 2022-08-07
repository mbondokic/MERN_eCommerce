import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {routeConfig} from "../config/routeConfig";
import styled from 'styled-components';
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from '../redux/userSlice';
// Bootstrap components
import {Container, Nav, Navbar} from "react-bootstrap";
// Icons
import {GiFlamer} from 'react-icons/gi';
import {FiLogIn, FiLogOut} from "react-icons/fi";

const Navigation = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {user} = useSelector(state => state.userStore);

	const logoutHandler = () => {
		dispatch(logout());
		dispatch(reset());
		navigate(routeConfig.HOME.url);
	}

	return (
		<StyledNav expand="lg" className='navigation'>
			<Container fluid>
				<Navbar.Brand as={Link} to={routeConfig.HOME.url}>
					<GiFlamer />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="ms-auto my-2 my-lg-0"
						navbarScroll
					>
						{user ?
							<Link to={routeConfig.HOME.url} onClick={logoutHandler} className="nav-link">
								<FiLogOut className="me-2"/>
								Logout
							</Link> :
							<Link to={routeConfig.AUTH.url} className="nav-link">
								<FiLogIn className="me-2"/>
								Login
							</Link>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</StyledNav>
	);
};

export default Navigation;

const StyledNav = styled(Navbar)`
	border-bottom: 2px solid #ddd;
	.navbar-brand {
		svg {
			font-size: 2rem;
		}
	}
`