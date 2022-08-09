const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const nodemailer = require("nodemailer");

// Register new user
// POST /api/user/register
const registerUser =  asyncHandler(async (req, res) => {
	const {username, email, password} = req.body;

	// Check for empty fields
	if(!username || !email || !password) {
		res.status(400);
		throw new Error('Please fill all fields.');
	}

	// Check if user exists
	const userExists = await User.findOne({email});
	if(userExists) {
		res.status(400);
		throw new Error('User already exists.');
	}

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create new user
	const user = await User.create({
		username,
		email,
		password: hashedPassword
	})

	if(user) {
		res.status(201).json({
			_id: user.id,
			username: user.username,
			email: user.email,
		 	token: generateToken(user._id)
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}

	// Send activation link
	await sendActivationLink(email, username, user);

})

// Send activation link after registration
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
// POST /api/users/complete-registration
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
// POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body;

	// Check user email
	const user = await User.findOne({email});

	// Compare login and hashed password
	if(user && (await bcrypt.compare(password, user.password))) {
		res.json({
		 	_id: user.id,
		 	username: user.username,
		 	email: user.email,
			token: generateToken(user._id),
			isActive: user.isActive,
			isAdmin: user.isAdmin
		})
	} else {
		res.status(400);
		throw new Error('Invalid email or password.');
	}
})

// Generate token
const generateToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'}, null)
}

// Get user data
// GET /api/users/get-users-data
const getUsersData = asyncHandler(async (req, res) => {
	const userID = req.user.id;
	const {_id, username, email} = await User.findById(userID);
	res.status(200).json({
		id: _id,
		username,
		email
	})
})

module.exports = {
	registerUser,
	loginUser,
	getUsersData,
	completeRegistration
}