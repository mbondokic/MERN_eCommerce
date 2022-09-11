import axios from 'axios';

const API_URL = '/api/products';

// Add product
const addProduct = async (productData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.post(`${API_URL}/add-product`, productData, config);
	return response.data;
}

// Get my products
const getMyProducts = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.get(`${API_URL}/my-products`, config);
	return response.data;
}

// Delete product
const deleteProduct = async(productID, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.delete(`${API_URL}/delete/${productID}`, config);
	return response.data;
}

// Edit product
const editMyProduct = async(productID, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.put(`${API_URL}/update/${productID}`, config);
	return response.data;
}

const productService = {
	addProduct,
	getMyProducts,
	deleteProduct,
	editMyProduct
}

export default productService;