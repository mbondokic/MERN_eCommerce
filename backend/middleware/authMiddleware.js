const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
	let token;
	const auth = req.headers.authorization;

	if(auth && auth.startsWith('Bearer')) {
		try{
			// Get token from header
			token = auth.split(' ')[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET, null, null);

			// GEt user from token
			req.user = await User.findById(decoded.id).select('-password');
			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Not authorized.');
		}
	}

	// Check if token exists
	if(!token) {
		res.status(401);
		throw new Error('Not authorized, no token.');
	}
})

module.exports = {
	protect
};