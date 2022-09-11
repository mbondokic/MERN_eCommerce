import React, {useContext, useState} from "react";
import styled from "styled-components";
import {Card} from "react-bootstrap";
import { BiExpandAlt, BiShoppingBag } from "react-icons/bi";
import {MdOutlineFavoriteBorder, MdFavorite, MdDeleteOutline} from "react-icons/md";
import {TbEdit} from "react-icons/tb";
import PrimaryBtn from "./PrimaryBtn";
import {useDispatch} from "react-redux";
import {deleteProduct} from '../redux/productSlice';
import {AddEditContext} from "../context/AddEditContext";
import toast from "react-hot-toast";

const ProductCard = ({product, favorite, setFavorite, openModal, setEditedProduct}) => {
  const [isEdit, setIsEdit] = useContext(AddEditContext);
  const dispatch = useDispatch();
  // Check for pathname to render buttons
  let pathname = window.location.pathname;

  // On shop page
  const addFavorite = (product) => {
    setFavorite([...favorite, product]);
  };
  const removeFavorite = (product) => {
    const filtered = favorite.filter((item) => item._id !== product._id);
    setFavorite(filtered);
  };
  const isFavorite = (product) => {
    return favorite.filter((item) => item._id === product._id).length > 0;
  };

  const editHandler = () => {
    setIsEdit(true);
    openModal();
    setEditedProduct(product);
  }

  const deleteProductHandler = () => {
    dispatch(deleteProduct(product._id));
    toast.success('Product deleted successfully.');
  }

  return (
    <CardWrapper>
      <Card>
        <Header>
          {pathname === 'shop' ?
            <div className="icon-wrapper">
              <BiExpandAlt />
            </div> :
            <div className="icon-wrapper" onClick={editHandler}>
              <TbEdit />
            </div>
          }
          {pathname === '/shop' ?
            <div className="icon-wrapper" onClick={() =>
              isFavorite(product) ? removeFavorite(product) : addFavorite(product)
            }>
              {isFavorite(product) ? (
                <MdFavorite />
              ) : (
                <MdOutlineFavoriteBorder/>
              )}
            </div> :
            <div className="icon-wrapper" onClick={deleteProductHandler}>
              <MdDeleteOutline/>
            </div>
          }
        </Header>
        <Card.Img variant="top" src={product.imgUrl} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <h6>Description</h6>
          <Card.Text>{product.description}</Card.Text>
          <Footer>
            <Price>
              <p className="mb-0 text-muted fw-bold">Price</p>
              <p>
                <strong>$ {product.price}</strong>
              </p>
            </Price>
            {pathname === '/shop' &&
              <PrimaryBtn buttonContent={<BiShoppingBag />} className="add-to-cart-btn" />
            }
          </Footer>
        </Card.Body>
      </Card>
    </CardWrapper>
  );
};

export default ProductCard;

const CardWrapper = styled.div`
  position: relative;
  .card {
    overflow: hidden;
    border-radius: 1.5rem;
    border-color: #f3e8ff;
    background-color: #f3e8ff;
    .card-body {
      background-color: #fff;
      border-radius: 2rem 2rem 0 0;
      z-index: 99;
      h6 {
        font-weight: bold;
      }
    }
    .add-to-cart-btn {
      svg {
        margin: 0;
      }
    }
  }
`;

const Header = styled.div`
  padding: 1rem;
  /* position: absolute;
  top: 0; */
  display: flex;
  justify-content: space-between;
  svg {
    width: 1.5em;
    height: 1.5em;
  }
  .icon-wrapper {
    background-color: #fff;
    border-radius: 10px;
    padding: 0.5rem;
    cursor: pointer;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
`;
