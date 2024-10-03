const User = require("../model/userModel");
const commonHelper = require('../helpers/commonHelper');
const messages = require("../constants/constantMessages")
//const Employee = require("../model/userModel");

const createEmployee = async (data) => {
  const [emailDetails] = await checkDuplicate(data.email);
  if (emailDetails) {
    return { isDuplicateEmail: true };
  }

  const hashedPassword = await commonHelper.generateHashPassword(data.password);

  const inputData = {
    name: data.name,
    email: data.email,
    password: hashedPassword,
    otp: data.otp,
    role: data.role || 'user', // Default to 'user' if no role is provided
  };

  const empData = new User(inputData);
  const result = await empData.save();
  return result;
};


 const checkDuplicate = async (email) => {
  return await Promise.all([checkDuplicateEmail(email)]);
}; 



const checkDuplicateUserEntry = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user ? true : false;
  } catch (error) {
    console.error('Error checking for duplicate user:', error);
    throw new Error('Error checking for duplicate user');
  }
};


 const checkDuplicateEmail = async (email) => {
  return await User.findOne({ email, isActive: true }, { _id: 1, email: 1, name: 1, isActive: 1 });
}; 

const deleteEmployee = async (id) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const editEmployee = async (id, data) => {
  const isDuplicate = await checkDuplicateUserEntry(data.email, id);
  if (isDuplicate) {
    return { isDuplicateEmail: true };
  }

  const updatehashPassword = await commonHelper.generateHashPassword(data.password);
  const inputData = {
    name: data.name,
    email: data.email,
    password: updatehashPassword,
    otp: data.otp,
  };
  const result = await User.findByIdAndUpdate({ _id: id }, inputData, { new: true });
  return result;
};

const loginEmployee = async (data) => {
  const userData = await User.findOne(
    { email: data.email },
    {
      email: 1,
      isActive: 1,
      password: 1,
      role:1, // Ensure password is included in the query
    }
  );   //console.log("userData----------", userData);
  if (!userData) {
    return { success: false, messages:messages.unknownUser };
  }
  // Based on user Status
  if (!userData.isActive) {
    return { success: false, messages:messages.deactivateduser };
  }
  const passwordIsValid = await commonHelper.verifyPassword(
    data.password,
    userData.password
  );// console.log(passwordIsValid);
   // Check correct password 
  if (!passwordIsValid) {
    return { success: false, messages:messages. incorrectPassword };
  }
  delete userData.password;
  return {
    userData,
    success: true,
  };
};

const viewSingleEmployee = async (id) => {
  const singleEmployeDetails = await User.findOne(
    { _id: id,
       isActive: true ,
    });
   // console.log("Single Employee--",singleEmployeDetails);
  return singleEmployeDetails;
};

/** FUNC- TO VERIFY ACTIVE USER */
const verifyEmployee = async (userId) => {
  //console.log("empId-----------", userId);
  return await User.findOne(
    { _id: userId, isActive: true },
    {
      _id: 1,
      email: 1,
      name: 1,
      isActive: 1,
    }
  );
};

/**FUNC- TO SEE LIST OF EMPLOYEE */
const listEmployee = async (bodyData, queryData) => {
  const { order } = queryData;
  const { searchKey } = bodyData;

  let query = searchKey 
      ? {
          $and: [
              {
                  $or: [
                      { name: { $regex: searchKey, $options: "i" } },
                      { email: { $regex: searchKey, $options: "i" } },
                  ],
              },
              {
                  isActive: true,
              },
          ],
      }
      : { isActive: true };

  const limit = queryData.limit ? parseInt(queryData.limit) : 0;
  const skip = queryData.page ? (parseInt(queryData.page) - 1) * limit : 0;

  const totalCount = await User.countDocuments(query);
  const employeeData = await User.find(query).sort({ _id: parseInt(order) }).skip(skip).limit(limit);

  console.log("EMp data--&**&", employeeData);

  return { totalCount, employeeData };
};

module.exports = {
  createEmployee,
  checkDuplicateUserEntry,
  deleteEmployee,
  editEmployee,
  loginEmployee,
  viewSingleEmployee,
  verifyEmployee,
  listEmployee
};



//  const checkDuplicateUserEntry = async (data, id) => {
//   if (data.email) {
//     const emailDetails = await User.findOne({ email: data.email });
//     if (emailDetails && emailDetails._id.toString() !== id) {
//       return { isDuplicateEmail: true };
//     }
//   }
//   return null;
// };
 
