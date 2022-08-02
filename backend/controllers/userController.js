const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Register new user
// POST /api/user/register
const registerUser = async (req, res) => {
	const {username, email, password} = req.body;

	// Check required fields
	if(!username || !email || !password) {
		res.status(400);
		throw new Error('Please fill required fields.');
	}

	User.findOne({email}, async (error, data) => {
		if(error) {
			console.log(error);
			res.send(error);
			return;
		}

		// Check if user exists
		if(data) {
			res.status(401);
			res.send('User already exists.');
		} else {
			const user = await User.create({
				username,
				email,
				password
			});
			res.send(user || 'User not registered.');
		}
	});

	// if(userExists) {
	// 	res.status(401);
	// 	throw new Error('User already exists.');
	// }

	// Hash password
	// const salt = await bcrypt.genSalt(10);
	// const hash = await bcrypt.hash(password, salt);
	//
	// // Create user
	// const user = await User.create({
	// 	username,
	// 	email,
	// 	password: hash
	// })
	//
	// if(user) {
	// 	res.status(201).json({
	// 		_id: user.id,
	// 		username: user.username,
	// 		email: user.email,
	// 	 	token: generateToken(user._id)
	// 	})
	// } else {
	// 	res.status(400);
	// 	throw new Error('Invalid user data.')
	// }

}

// Authenticate user
// POST /api/user/login
const loginUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body;

	// Check email
	const user = await User.findOne({email});

	// Check password
	if(user && (await bcrypt.compare(password, user.password))) {
		res.json({
		 _id: user.id,
		 username: user.username,
		 email: user.email,
		 token: generateToken(user._id)
	 })
	} else {
		res.status(400);
		throw new Error('Invalid credentials.')
	}

})

// Get user data
// GET /api/users/userToken
const getUserData = asyncHandler(async (req, res) => {
	const userID = req.user.id;
	const {_id, username, email} = await User.findById(userID);
	res.status(200).json({
		id: _id,
		username,
		email
	})
})

// Generate jwt token
const generateToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET, null, null)
}

module.exports = {
	registerUser,
	loginUser,
	getUserData
}