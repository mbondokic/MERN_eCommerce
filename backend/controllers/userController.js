const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const nodemailer = require("nodemailer");

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

			// Send activation link to email
			await sendActivationLink(email, username, user);

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

const sendActivationLink = async (email, username, user) => {
	let testAccount = await nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});

	let info = await transporter.sendMail({
		from: '"Fred Foo 👻" <office@onlineShop.com>', // sender address
		to: email, // list of receivers
		subject: "Activate account", // Subject line
		text: "", // plain text body
		html: `
            <h1>Activate account</h1>
            <p>Dear, ${username}</p>
            <p>Please click on link bellow to activate your account</p>
            <a href="http://localhost:3000/user-activate/${user._id.toString()}" target="_blank">Activate account</a>
            `, // html body
	});

	console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}

// Complete registration
// POST /api/complete-registration
const completeRegistration = (req, res) => {
	const {userID} = req.body;
	User.updateOne({_id: userID}, {isActive: true}, (error, data) => {
		if(error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(data);
		}
	})
}

// Authenticate user
// POST /api/user/login
const loginUser = async (req, res) => {
	const {email, password} = req.body;

	// // Check email
	// const user = await User.findOne({email});
	//
	// // Check password
	// if(user && (await bcrypt.compare(password, user.password))) {
	// 	res.json({
	// 	 _id: user.id,
	// 	 username: user.username,
	// 	 email: user.email,
	// 	 token: generateToken(user._id)
	//  })
	// } else {
	// 	res.status(400);
	// 	throw new Error('Invalid credentials.')
	// }

}

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
	getUserData,
	completeRegistration
}