const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Register new user
// POST /api/users
const registerUser = asyncHandler(async (req, res) => {
	const {username, email, password} = req.body;

	// Check required fields
	if(!username || !email || !password) {
		res.status(400);
		throw new Error('Please fill required fields.');
	}

	// Check if user exists
	const userExists = await User.findOne({email});
	if(userExists) {
		res.status(400);
		throw new Error('User already exists.');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		username,
		email,
		password: hash
	})

	if(user) {
		res.status(201).json({
			_id: user.id,
			username: user.username,
			email: user.email,
		 	token: generateToken(user._id)
		})
	} else {
		res.status(400);
		throw new Error('Invalid user data.')
	}

})

// Authenticate user
// POST /api/users/login
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