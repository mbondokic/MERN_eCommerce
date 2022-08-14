import React, {useEffect, useState, useContext} from 'react';
import {Row, Col} from 'react-bootstrap';
import PrimaryBtn from "../components/PrimaryBtn";
import {HiOutlineViewGridAdd} from "react-icons/hi";
import AddEditProductForm from "../components/AddEditProductForm";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {routeConfig} from "../config/routeConfig";
// import {reset} from "../redux/productSlice";
import {getMyProducts} from "../redux/productSlice";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

import {AddEditProvider, AddEditContext} from "../context/AddEditContext";

const UserProducts = () => {
	const {user} = useSelector(state => state.userStore);
	const {products, isLoading, isError, isSuccess, message} = useSelector(state => state.productStore);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useContext(AddEditContext);
	
	// Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		if(user.isActive !== 'true') {
			navigate(routeConfig.USER_ACTIVATE.url);
		}

		if(isError) {
			console.log(message);
		}

		dispatch(getMyProducts());
	}, [user, navigate, isError, message, dispatch]);

	if(isLoading) {
		return <Loader />;
	}

	const addHandler = () => {
		setIsEdit(false);
		handleShow();
	}

	// TODO: close modal if success

	return (
		<>
			<AddEditProvider>
				<Row className="mt-5">
					<Col md={12}>
						<PrimaryBtn buttonContent="New product" icon={<HiOutlineViewGridAdd/>} onClick={handleShow}/>
					</Col>
				</Row>
				<Row className="mt-5">
					{products.length > 0 ?
						products.map(product => {
								return (
									<Col md={4} key={product._id} className="mt-2 mb-3">
										<ProductCard product={product} openModal={handleShow} />
									</Col>
									)
							})
						:
						<h3>No products to show.</h3>
					}
				</Row>
				{/* Modal */}
				<AddEditProductForm show={show} handleClose={handleClose} />
			</AddEditProvider>
		</>
	);
};

export default UserProducts;