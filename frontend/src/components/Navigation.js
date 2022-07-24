import React from 'react';
import {Link} from "react-router-dom";
import {routeConfig} from "../config/routeConfig";
import styled from 'styled-components';
// Bootstrap components
import {Container, Nav, Navbar} from "react-bootstrap";
// Icons;
import {GiFlamer} from 'react-icons/gi';
import {FiLogIn} from "react-icons/fi";
import {AiOutlineUserAdd} from "react-icons/ai";

const Navigation = () => {
	return (
		<StyledNav expand="lg" className='navigation'>
			<Container fluid>
				<Navbar.Brand href="#">
					<GiFlamer />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="ms-auto my-2 my-lg-0"
						navbarScroll
					>
						<Link to={routeConfig.LOGIN.url} className="nav-link">
							<FiLogIn className="me-2"/>
							Login
						</Link>
						<Link to={routeConfig.REGISTER.url} className="nav-link">
							<AiOutlineUserAdd className="me-2"/>
							Register
						</Link>
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