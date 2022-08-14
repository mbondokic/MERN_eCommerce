import React from 'react';
import styled from 'styled-components';

const PrimaryBtn = ({buttonContent, icon, onClick, type, className}) => {
	return <StyledBtn className={className} type={type} onClick={onClick}>{icon}{buttonContent}</StyledBtn>
}

export default PrimaryBtn;

const StyledBtn = styled.button`
  font-weight: 0;
  color: #fff;
  background-color: #c292de;
  padding: 10px 30px;
  border: solid #c292de 2px;
  box-shadow: rgb(0, 0, 0) 0 0 0 0;
  border-radius: 0 20px 20px 20px;
  transition: 333ms;
  /* width: 30%; */
  display: inline-block;

  svg {
    width: 1.5em;
    height: 1.5em;
    margin-right: 10px;
  }

  &:hover {
    transition: 333ms;
    //padding: 10px 50px;
    background-color: #fff;
    color: #c292de;
    border: solid 2px #c292de;
  }

  /* @media (min-width: 576px) {
    width: 50%;
    margin: 0 auto;
  } */
`