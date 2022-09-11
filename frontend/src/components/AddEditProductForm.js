import React, {useState, useContext, useEffect} from 'react';
import {useDispatch} from "react-redux";
// Components
import {FloatingLabel, Form, Modal} from "react-bootstrap";
import PrimaryBtn from "./PrimaryBtn";
// Icons
import {BsClipboardPlus} from "react-icons/bs";
// Images
import defaultProductImg from '../img/default_product_img.svg';
// Functions
import {addProduct, editMyProduct} from '../redux/productSlice';

import {AddEditContext} from "../context/AddEditContext";
import toast from "react-hot-toast";

const AddEditProductForm = ({product, show, handleClose, editedProduct, setEditedProduct}) => {
	const [isEdit, setIsEdit] = useContext(AddEditContext);
	const [productData, setProductData] = useState({
	 	imgUrl: defaultProductImg,
		userToken: JSON.parse(localStorage.getItem('user')).token
 	});
	const [isFormValid, setIsFormValid] = useState(true);

	const dispatch = useDispatch();

	const handleChange = (e) => {
		setProductData({
			 ...productData,
			 [e.target.name]: e.target.value
		});

		if (!productData.imgUrl) {
			setProductData(productData.imgUrl);
		}

		setEditedProduct({
			 ...editedProduct,
			 [e.target.name]: e.target.value
		})
	}

	const formSubmitHandler = (e) => {
		e.preventDefault();

		if(isEdit) {
			dispatch(editMyProduct(editedProduct._id));
			closeModalHandler();
			// toast.success('Product edited successfully.' || message);
		} else {
			addProductHandler();
		}
	}

	const addProductHandler = () => {
		if(!productData.title || !productData.description || !productData.price) {
			setIsFormValid(false);
			toast.error('Please fill in all required fields.');
			return;
		}
		dispatch(addProduct(productData));
		toast.success(`Product added successfully.`);
		closeModalHandler();
	}

	const closeModalHandler = () => {
		setIsEdit(false);
		handleClose();
		setEditedProduct('');
	}

	// const editMyProductHandler = () => {
	// 	dispatch(editMyProduct(editedProduct._id));
	// 	handleClose();
	// }

	return (
		<Modal
			show={show}
			onHide={closeModalHandler}
			backdrop="static"
			keyboard={false}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>{isEdit ? 'Edit product' : 'Add product'}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={formSubmitHandler}>
					<Form.Group className="mb-3" controlId="title">
						<FloatingLabel
							controlId="title"
							label="* Title"
						>
							<Form.Control type="text"
														placeholder="Title"
														name="title"
														onChange={handleChange}
														defaultValue={editedProduct.title}
														/>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className="mb-3" controlId="email">
						<FloatingLabel controlId="category" label="Category">
							<Form.Select aria-label="category">
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</Form.Select>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className="mb-3" controlId="description">
						<FloatingLabel controlId="description" label="* Description">
							<Form.Control type="text"
														as="textarea"
														style={{height: '100px'}}
														placeholder="Description"
														name="description"
														onChange={handleChange}
														defaultValue={editedProduct.description}
							/>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className="mb-3" controlId="price">
						<FloatingLabel controlId="price" label="* Price">
							<Form.Control type="number"
														placeholder="Price"
														name="price"
														onChange={handleChange}
														defaultValue={editedProduct.price}
							/>
						</FloatingLabel>
					</Form.Group>
					<Form.Group className="mb-3" controlId="imgUrl">
						<FloatingLabel controlId="imgUrl" label="Image URL">
							<Form.Control type="text"
														placeholder="Image URL"
														name="imgUrl"
														onChange={handleChange}
							/>
						</FloatingLabel>
					</Form.Group>
					<PrimaryBtn buttonContent={isEdit ? 'Save' : 'Add'} type="submit" icon={<BsClipboardPlus/>} className="d-block ms-auto"/>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default AddEditProductForm;