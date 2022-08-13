import React, {useState} from 'react';
import ProductCard from "../components/ProductCard";
import {useDispatch, useSelector} from "react-redux";

const Shop = () => {
	const {products, isLoading, isError, isSuccess, message} = useSelector(state => state.productStore);
	const dispatch = useDispatch();
	// Product card
	const [favorite, setFavorite] = useState([]);

	// TODO: get products from all users
	return (
		<>
			{/*<ProductCard favorite={favorite} setFavorite={setFavorite}/>*/}
		</>
	);
};

export default Shop;