const employeeService = require("../Services/employeeService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const authService = require("../Services/authService");
const authMiddleware = require("../Middleware/Authmiddleware");
const mongoose =require('mongoose');

/** FUNC- FOR CREATE-EMPLOYEE */

const createEmployee = async (req, res) => {
  try {
    const result = await employeeService.createEmployee(req.body);
    if (result?.isDuplicateEmail) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateEmail,
        200
      );
    }

    return Responses.successResponse(
      req,
      res,
      result,
      messages.createdSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

/** FUNC- FOR DELETE-EMPLOYEE */

const deleteEmployee = async (req, res) => {
  try {
    const result = await employeeService.deleteEmployee(req.params.id);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.deleteFailedRecordNotFound,
        200
      );
    }
    return Responses.successResponse(
      req,
      res,
      null,
      messages.deleteSuccess,
      200
    );
  } catch (error) {
    console.log("Error in deleteEmployee:", error);
    return Responses.errorResponse(req, res, error);
  }
};

/** FUNC- FOR EDIT-EMPLOYEE */

const editEmployee = async (req, res) => {
  try {
    const result = await employeeService.editEmployee(req.params.id, req.body);
    console.log(result);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.updateFailedRecordNotFound,
        200
      );
    }
    if (result?.isDuplicateEmail) {
      return Responses.failResponse(
        req,res,null,messages.duplicateEmail,200);
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.updateSuccess, 
      200);
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

/** FUNC- FOR CHECK-DUPLICATE-USER */

const checkDuplicateUser = async (req, res) => {
  try {
    const { email } = req.body;
    const isDuplicateUser = await employeeService.checkDuplicateUserEntry(email);

    if (isDuplicateUser) {
      return Responses.successResponse(
        req,
        res,
        { isDuplicateUser: true },
        'Email found',
        200
      );
    } else {
      return Responses.successResponse(
        req,
        res,
        { isDuplicateUser: false },
        'Email not found',
        200
      );
    }
  } catch (error) {
    console.error('Error checking email:', error);
    return Responses.errorResponse(req, res, { message: error.message }, 500);
  }
};

/** FUNC- FOR LOGIN-EMPLOYEE */

const loginEmployee = async (req, res) => {
  try {
    const result = await employeeService.loginEmployee(req.body);

    if (!result.success) {
      return Responses.failResponse(req, res, null, result.messages, 200);
    }

    const userData = result.userData;

    // Generate a token
    const token = await authMiddleware.generateUserToken({
      userId: userData._id,
      name: userData.name,
    });

    return Responses.successResponse(
      req,
      res,
      { userData,token },
      'Login successful',
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};
/** FUNC- FOR SEND-OTP*/

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await authService.sendOTP(email);
    return Responses.successResponse(req, res, response, response.message, 200);
  } catch (error) {
    return Responses.errorResponse(req, res, { message: error.message }, 401);
  }
};

/** FUNC- FOR VERIFY-OTP */

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const response = await authService.verifyOtp(email, otp);
    return Responses.successResponse(req, res, response, response.message, 200);
  } catch (error) {
    return Responses.errorResponse(req, res, { message: error.message }, 400);
  }
};

/** FUNC- FOR VIEW-SINGLE-EMPLOYEE */

const viewSingleEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID before proceeding
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Responses.failResponse(
        req,
        res,
        null,
        'Invalid employee ID',
        400
      );
    }

    const result = await employeeService.viewSingleEmployee(id);
    console.log("viewSingleEmployee result", result);

    if (!result) {
      return Responses.failResponse(
        req, 
        res,
        null,
        messages.recordsNotFound,
        200
      );
    }

    return Responses.successResponse(
      req,
      res,
      result,
      messages.recordsFound,
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

/** FUNC- FOR LIST-EMPLOYEE */

const listEmployee = async (req, res) => {
  try {
    const result = await employeeService.listEmployee(
      req.body, req.query
    );
    console.log(result);
    if (result.length == 0) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.recordsNotFound,
        200
      );
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.recordsFound,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};


module.exports = {
  createEmployee,
  deleteEmployee,
  editEmployee,
  checkDuplicateUser,
  loginEmployee,
  sendOTP,
  verifyOtp,
  viewSingleEmployee,
  listEmployee
};


//  const checkDuplicateUser = async (req, res) => {
//   try{
//     const result =await employeeService.checkDuplicateUserEntry(req.body);
//     console.log("result",result);
//     const resultObject = {
//       isDuplicateUser: true,
//     };
//     if(!result){
//       resultObject.isDuplicateUser =false;
//       return Responses.failResponse(
//         req,res,resultObject,messages.recordNotFound,200
//       );
//     }
//     return Responses.successResponse(
//       req,res,resultObject,messages.duplicateEmail,200
//     );
//   }
//   catch (error){
//     console.log(error);
//     return Responses.errorResponse(req, res, error);
//   }
//  };