import React, { useState } from 'react';
import {Row, Col} from 'react-bootstrap';
import PrimaryBtn from "../components/PrimaryBtn";
import {HiOutlineViewGridAdd} from "react-icons/hi";
import AddEditProductForm from "../components/AddEditProductForm";

const UserProducts = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Row className="mt-5">
				<Col md={12}>
					<PrimaryBtn buttonText="New product" icon={<HiOutlineViewGridAdd/>} onClick={handleShow}/>
				</Col>
			</Row>
			<Row>
				{/*	map cols */}
			</Row>
			{/* Modal */}
			<AddEditProductForm show={show} handleClose={handleClose} handleShow={handleShow}/>
		</>
	);
};

export default UserProducts;