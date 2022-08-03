const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUserData, completeRegistration} = require('../controllers/userController');
const {protect} = require("../middleware/authMiddleware");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/complete-registration', completeRegistration);
router.get('/userToken', protect, getUserData);

module.exports = router;