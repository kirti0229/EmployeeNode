const Employee = require("../model/userModel");
const emailService = require("../Services/emailService");
const commonHelper = require("../helpers/commonHelper");

const OTP_EXPIRY_DURATION_SECONDS = 180; // 3 minutes in seconds

/** FUNC- LOGIN USER WITH OTP */
const sendOTP = async (email) => {
  try {
    const user = await Employee.findOne({ email, isActive: true });
    if (user) {
      const otp = commonHelper.generateOTP();
      user.otp = otp;
      user.otpCreatedAt = new Date();
      await user.save();

      const emailSubject = "OTP Confirmation";
      const mailData = `<b>Your OTP is ${otp}</b>`;
      await emailService.sendEmail(email, emailSubject, mailData);
      return { success: true, message: "OTP sent to email" };
    } else {
      throw new Error("Invalid email or user not active");
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error(error.message || "Error sending OTP");
  }
};

/** FUNC- VERIFY OTP */
const verifyOtp = async (email, otp) => {
  try {
    const user = await Employee.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const otpAgeInSeconds = (new Date() - new Date(user.otpCreatedAt)) / 1000;

    if (user.otp === otp && otpAgeInSeconds < OTP_EXPIRY_DURATION_SECONDS) { // Check if OTP is within the expiry duration
      user.otp = null; // Clear OTP after successful verification
      user.otpCreatedAt = null;
      await user.save();

      return { success: true, message: "OTP verified, user logged in successfully" };
    } else {
      throw new Error("Invalid OTP or OTP expired");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error(error.message || "Error verifying OTP");
  }
};

module.exports = {
  sendOTP,
  verifyOtp,
};
