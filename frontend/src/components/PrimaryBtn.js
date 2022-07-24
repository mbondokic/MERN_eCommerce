import React from 'react';
import styled from 'styled-components';

const PrimaryBtn = ({buttonText}) => {
  return <StyledBtn>{buttonText}</StyledBtn>
}

export default PrimaryBtn;

const StyledBtn = styled.button`
  font-weight: 0;
  color: #fff;
  background-color: #c292de;
  padding: 10px 30px;
  border: solid #c292de 2px;
  box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
  border-radius: 50px 14px 50px 25px;
  transition : 333ms;
  transform: translateY(0);
  width: 100%;
  &:hover{
    transition : 333ms;
    padding: 10px 50px;
    transform : translateY(-0px);
    background-color: #fff;
    color: #c292de;
    border: solid 2px #c292de;
  }
  @media (min-width: 576px) {
    width: 50%;
    margin: 0 auto;
  }
`