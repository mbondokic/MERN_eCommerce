import React from 'react';
import styled from 'styled-components';

const PrimaryBtn = ({buttonText, icon, onClick, type, className}) => {
	return <StyledBtn className={className} type={type} onClick={onClick}>{icon}{buttonText}</StyledBtn>
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
    margin-right: 10px;
  }

  &:hover {
    transition: 333ms;
    //padding: 10px 50px;
    background-color: #fff;
    color: #c292de;
    border: solid 2px #c292de;
  }

  svg {
    width: 1.5em;
    height: 1.5em;
  }

  /* @media (min-width: 576px) {
    width: 50%;
    margin: 0 auto;
  } */
`