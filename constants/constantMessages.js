const createdSuccess = "Created successfully!";
const createError = "Error while creating!";
const updateSuccess = "Updated successfully!";
const updateFailedRecordNotFound = "Record not found. Update failed!";
const updateDataNotModified =
  "The record has not been altered and remains unchanged.";
const updateError = "Error while updating record!";
const deleteSuccess = "Deleted successfully!";
const deleteFailedRecordNotFound = "Record not found. Delete failed!";
const alreadyDeleted =
  "The record you are trying to delete has already been deleted.";
const deleteError = "Error while deleting record!";
const recordsNotFound = "No records found!";
const recordNotFound = "No record found!";
const recordsFound = "Records found!";
const recordFound = "Record found!";
const sendEmailError = "Error while senidng email!";
const userElredyExist = "user already exists!";
const forgotPasswordSuccess = "Your password has been sent on your email!";
const tokenVefificationFailed = "TokenVefificationFailed";
const authFailed = "authFailed";
const tokenIsMissing = "TokenIsMissing";
const unknownUser = "Unknown user type";
const noToken = "NoToken";
const duplicateEntry = "Duplicate entry found!";
const duplicateUnitEntry = "Duplicate unit name found!";
const duplicateEmpCode = "Duplicate employee code found!";
const duplicateEmail = "Duplicate email found!";
const uploadFileSuccess = "File uploaded successfully!";
const uploadFileErroe = "Error while uploading a file!";
const deleteFileSuccess = "File deleted successfully!";
const deleteFileErroe = "Error while deleting the files!";
const noFileFound = "noFileFound!";
const noUploadFor = "noUploadFor!";
const invalidUploadFor = "invalid upload for!";
const somethingWentWrong = "Something went wrong!";
const expiredOtp =
  "The OTP you entered has been expired. Please use resend otp!";
const invaliToken = "Invalid token";
const invalidUser = "User is not valid user!";
const deactivateduser ="User is deactivated";
//---------------------------------------------------------------------------------------//
const organizationCreated = "Organization created successfully";
const duplicateOrganizationFound = "This Email is already exist!!";
const duplicateDepartment = "This department allready exist";
const departmentCreated = "Department has been created";
const idIsNotAvailabled = "Given id is Not availabled";
const organizationUpdated = "Organization data updated";
const departmentUpdated = "Department data updated";
const departmentDeleted = "Department has been Deleted";
const departmentList = "Department list fetched";
const designationCreated = "Designation has been created";
const designationUpdated = "Designation has been updated";
const designationDeleted = "Designation has been deleted";
const designationList = "Fetched all designations";
const cancelFailed = "Cancel Failed";
const canceled = "Canceled Successfuly";
const invalidId = "Invalid Id!";
const duplicateName = "This Name is already exist!!";
const signInSuccess = "You have successfully signed in!";
const incorrectPassword =
  "The password you entered is incorrect. Please verify and try again.";
const passwordResetSuccess = "Your password has been successfully reset!";
const otpVerifiedSuccess = "Your OTP has been successfully verified!";
const invalidOtp =
  "The OTP you entered is incorrect. Please verify and try again.";
const userNotFound =
  "The email you entered does not match our records. Please enter a valid email.";
const otpSentSuccess = async (email) => {
  return `We have sent an OTP to your registered email address at ${email}. Please check your email and enter it here.`;
};
const otpResendMessage = async (attemptNumbar, email) => {
  return `You have requested to resend the OTP ${attemptNumbar} out of ${process.env.OTP_MAX_RESENDCOUNT} times. An OTP has been sent to your registered email address at ${email}. Please check your email and enter the OTP here.`;
};
const otpResendMaxLimitCrossed = `Sorry! You have reached the maximum limit of 3 OTP resend attempts. Please try again after ${process.env.OTP_MAX_RESEND_TIMEINMINUTES} minutes.`;

const momGeneratedSuccessfully="MOM generated succeffully."
const pleaseAddAttendance="Please add attendance."
const configCreatedSuccess = "Configuration Created successfully!";
const configUpdateSuccess = "Configuration Updated successfully!";
const rescheduledSuccess="Meeting rescheduled successfully."
const accessDenied="Access denied!";
const momWritePermissionDenied="MOM write permission access denied!"
module.exports = {
  momWritePermissionDenied,
  accessDenied,
  pleaseAddAttendance,
  momGeneratedSuccessfully,
  rescheduledSuccess,
  otpResendMessage,
  duplicateName,
  otpSentSuccess,
  userNotFound,
  invalidOtp,
  expiredOtp,
  otpVerifiedSuccess,
  invaliToken,
  invalidUser,
  deactivateduser,
  otpResendMaxLimitCrossed,
  
  //----------------------------//
  recordNotFound,
  createError,
  organizationCreated,
  duplicateOrganizationFound,
  duplicateDepartment,
  departmentCreated,
  idIsNotAvailabled,
  organizationUpdated,
  departmentUpdated,
  departmentDeleted,
  departmentList,
  designationCreated,
  designationUpdated,
  designationDeleted,
  designationList,
  duplicateEntry,
  duplicateUnitEntry,
  createdSuccess,
  invalidId,
  updateSuccess,
  passwordResetSuccess,
  signInSuccess,
  incorrectPassword,
  recordsNotFound,
  recordsFound,
  deleteSuccess,
  updateFailedRecordNotFound,
  deleteFailedRecordNotFound,
  duplicateEmpCode,
  duplicateEmail,
  canceled,
  cancelFailed,
  configCreatedSuccess,
  configUpdateSuccess,
  unknownUser
};
