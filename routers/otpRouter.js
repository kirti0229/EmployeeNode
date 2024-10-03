const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');


router.post('/login-otp', employeeController.sendOTP); 
router.post('/verify-otp' ,employeeController.verifyOtp);
router.post('/check-email', employeeController.checkDuplicateUser);


module.exports = router;