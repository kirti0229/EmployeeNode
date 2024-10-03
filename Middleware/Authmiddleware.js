const jwt = require("jsonwebtoken");
const Responses = require("../helpers/response");
const employeeService = require("../Services/employeeService");
const messages=require("../constants/constantMessages");

//const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

/*FUNC TO GENERATE NEW TOKEN FOR USER*/
const generateUserToken = async (data) => {
  token = jwt.sign(data, process.env.JWT_USER_SECRET, {
    //expiresIn: 86400 // 24 hours
    expiresIn: "300d", 
  });
  return `Bearer ${token}`; 
};


/* FUNC TO VERIFY A TOKEN FOR USER */
const verifyUserToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log("token-->", token);
    if (token.startsWith("Bearer ")) {
      token = token.substring(7, token.length);
    }
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    console.log("decoded---", decoded);
    const userId = decoded.userId; // Extract userId from decoded token
    const isActiveUser = await employeeService.verifyEmployee(userId);
    console.log("isActiveUser------", isActiveUser);
    if (isActiveUser) {
      req.userId = userId;
      req.userData = isActiveUser;
      next();
    } else {
      console.log("return from jwt verify");
      return Responses.failResponse(
        req,
        res,
        { isInValidUser: true },
        messages.invalidUser,
        200
      );
    }
  } catch (error) {
    console.log("Errorrr", error);
    return Responses.failResponse(req, res, null, messages.invaliToken, 200);
  }
};
module.exports = {
  generateUserToken,
  verifyUserToken
};
