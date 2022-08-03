import axios from 'axios';

class UserService {
	static register(body) {
		return axios.post('/api/user/register', body);
	}

	static completeRegistration(body) {
		return axios.post('/api/user/complete-registration', body);
	}

	static login(body) {
		return axios.post('/api/user/login', body);
	}
}

export default UserService;