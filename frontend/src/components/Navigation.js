import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {routeConfig} from "../config/routeConfig";
import styled from 'styled-components';
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from '../redux/userSlice';
// Bootstrap components
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
// Images
import userImg from '../img/user.png';
// Icons
import {GiFlamer} from 'react-icons/gi';
import {FiLogIn, FiLogOut} from "react-icons/fi";
import toast from "react-hot-toast";

const Navigation = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {user} = useSelector(state => state.userStore);
	const logoutHandler = () => {
		dispatch(logout());
		toast.success(`You are now logged out.`);
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
						className="mx-auto my-2 my-lg-0"
						navbarScroll
					>
						<Nav.Link as={Link} to={routeConfig.HOME.url}>Home</Nav.Link>
						<Nav.Link as={Link} to={routeConfig.SHOP.url}>Shop</Nav.Link>
						<Nav.Link href="#link">About</Nav.Link>
						<Nav.Link href="#link">Contact</Nav.Link>
					</Nav>
					<Nav>
						{user ?
							<>
								<Link to={routeConfig.MY_PROFILE.url} className="user-img-wrapper">
									<img src={userImg} alt="User" className="user-image"/>
								</Link>
								<NavDropdown title={user.username} id="basic-nav-dropdown" align="end">
									<NavDropdown.Item as={Link} to={routeConfig.MY_PRODUCTS.url}>
										My products
									</NavDropdown.Item>
									{user.isAdmin === 'true' &&
										<NavDropdown.Item as={Link} to={routeConfig.HOME.url}>Dashboard</NavDropdown.Item>
									}
									<NavDropdown.Item as={Link} to={routeConfig.HOME.url} onClick={logoutHandler}>
										<FiLogOut className="me-2"/>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</> :
							<Link to={user?.isActive === 'false' ? routeConfig.USER_ACTIVATE.url : routeConfig.AUTH.url} className="nav-link">
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
	.user-img-wrapper {
		display: flex;
    justify-content: center;
    .user-image {
      width: 60%;
    }
	}
`