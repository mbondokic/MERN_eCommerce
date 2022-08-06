const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUsersData, completeRegistration} = require('../controllers/userController');
const {protect} = require("../middleware/authMiddleware");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/complete-registration', completeRegistration);
router.get('/get-users-data', protect, getUsersData);

module.exports = router;