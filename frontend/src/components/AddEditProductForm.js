import React, {useState} from 'react';
import {useDispatch} from "react-redux";
// Components
import {FloatingLabel, Form, Modal} from "react-bootstrap";
import PrimaryBtn from "./PrimaryBtn";
// Icons
import {BsClipboardPlus} from "react-icons/bs";
// Images
import defaultProductImg from '../img/default_product_img.svg';
// Functions
import {addProduct} from '../redux/productSlice';

const AddEditProductForm = ({show, handleClose}) => {
	const [product, setProduct] = useState({
	  imgUrl: defaultProductImg,
	  // userId: JSON.parse(localStorage.getItem("user")).token,
  });

	const dispatch = useDispatch();

	const handleChange = (e) => {
		setProduct(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const formSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(addProduct(product));
	}

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Modal title</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={formSubmitHandler}>
					<Form.Group className="mb-3" controlId="title">
						<FloatingLabel
							controlId="title"
							label="* Title"
						>
							<Form.Control type="text" placeholder="Title" name="title" required onChange={handleChange}/>
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
														required
														placeholder="Description"
														name="description"
														onChange={handleChange}/>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className="mb-3" controlId="price">
						<FloatingLabel controlId="price" label="* Price">
							<Form.Control type="number"
														required
														placeholder="Price"
														name="price"
														onChange={handleChange}/>
						</FloatingLabel>
					</Form.Group>
					<Form.Group className="mb-3" controlId="imgUrl">
						<FloatingLabel controlId="imgUrl" label="Image URL">
							<Form.Control type="text"
														placeholder="Image URL"
														name="imgUrl"
														onChange={handleChange}/>
						</FloatingLabel>
					</Form.Group>
					<PrimaryBtn buttonText="Add" type="submit" icon={<BsClipboardPlus/>} className="d-block ms-auto"/>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default AddEditProductForm;