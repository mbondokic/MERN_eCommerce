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

const productService = {
	addProduct
}

export default productService;