import axios from 'axios';

class UserService {
	static register(body) {
		return axios.post('/api/users/register', body);
	}

	static completeRegistration(body) {
		return axios.post('/api/users/complete-registration', body);
	}

	static login(body) {
		return axios.post('/api/users/login', body);
	}
}

export default UserService;