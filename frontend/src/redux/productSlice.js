import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productService from "../services/productService";

const initialState = {
	products: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// Add product
export const addProduct = createAsyncThunk('products/add-product', async (productData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().userStore.user.token;
		return await productService.addProduct(productData, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
})

// Get user products
export const getMyProducts = createAsyncThunk('products/my-products', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().userStore.user.token;
		return await productService.getMyProducts(token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
})

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		reset: state => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(addProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products.push(action.payload)
			})
			.addCase(addProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(getMyProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMyProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
			})
			.addCase(getMyProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
	}
})

export const {reset} = productSlice.actions;
export default productSlice.reducer;