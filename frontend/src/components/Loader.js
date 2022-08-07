import React from 'react';
import styled from 'styled-components';

const Loader = () => {
	return (
		<Spinner>
			
		</Spinner>
	);
};

export default Loader;

const Spinner = styled.div`
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	height: 50px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	position: relative;
	width: 50px; }
	&:after, &:before {
	border: 6px solid #c292de;
	border-radius: 100%;
	position: absolute;
	content: '';
	display: block; }
	&:before {
	border-bottom-color: transparent;
	border-left-color: transparent;
	animation: spin .75s infinite linear reverse;
	height: 30px;
	width: 30px; }
	&:after {
	-webkit-animation: spin .5s infinite linear;
	animation: spin .5s infinite linear;
	height: 50px;
	width: 50px;
	border-right-color: transparent;
	border-top-color: transparent; }

@-webkit-keyframes spin {
	to {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg); } }

@keyframes spin {
	to {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg); } 
`