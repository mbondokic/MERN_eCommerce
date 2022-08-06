import {createSlice} from '@reduxjs/toolkit';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'));

// Initial state
const initialState = {
	user: user ? user : null,
	token: token ? token : null,
	// isError: false,
	// isSuccess: false,
	// isLoading: false,
	// message: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		// reset: (state) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = false;
		// 	state.isError = false;
		// 	state.message = ''
		// }
	}
})

export const {setUser, reset} = userSlice.actions;
export default userSlice.reducer;