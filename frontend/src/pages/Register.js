import React, {useState} from 'react';

const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const {name, email, password, confirmPassword} = formData;

	return (
		<div>
			<h1>Register</h1>
		</div>
	);
};

export default Register;