import axios from 'axios';

const API_URL = '/api/users';

// Register user
const register = async (userData) => {
	return await axios.post(`${API_URL}/register`, userData);
}

// Complete registration (activation email)
const completeRegistration = async(userData) => {
	return await axios.post(`${API_URL}/complete-registration`, userData);
}

// Login user
const login = async (userData) => {
	const response =  await axios.post(`${API_URL}/login`, userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
}

// Logout
const logout = () => {
	localStorage.removeItem('user');
}

const userService = {
	register,
	completeRegistration,
	login,
	logout
}

export default userService;
