import axios from 'axios';

class UserService {
	static register(body) {
		return axios.post('/api/user/register', body);
	}

	static login(body) {
		return axios.post('/api/user/login', body);
	}
}

export default UserService;