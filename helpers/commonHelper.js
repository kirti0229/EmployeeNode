
const bcrypt = require('bcrypt');
const crypto = require("crypto")
const saltRounds = 10; // Adjust salt rounds as needed

const generateHashPassword = async (normalPassword) => {
  return bcrypt.hashSync(normalPassword, saltRounds);
};

const verifyPassword = async (plainPassword, hashPass) => {
  console.log("process here!!");
  return bcrypt.compare(plainPassword, hashPass);
};

const generateOTP = () => {
  return crypto.randomInt(1000,9999).toString(); // Generates a 4-character OTP
};

const generateOTPExpiry = () => {
  const now = new Date();
  return new Date(now.getTime() + 15 * 60000); // OTP valid for 15 minutes
};
module.exports = {
  generateHashPassword,
  verifyPassword,
  generateOTP,
  generateOTPExpiry
};
