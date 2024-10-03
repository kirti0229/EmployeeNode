const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const validator = require("../validators/employeeValidator")
const middleware = require ("../Middleware/Authmiddleware")

router.post("/createEmployee",validator.createEmployeeValidator, employeeController.createEmployee);
router.delete("/deleteEmployee/:id",validator.deleteEmployeeValidator, employeeController.deleteEmployee);
router.put("/editEmployee/:id",validator.editEmployeeValidator, employeeController.editEmployee);
router.post("/login",validator.loginEmployeeValidator, employeeController.loginEmployee);
router.get("/viewEmployee/:id",middleware.verifyUserToken, employeeController.viewSingleEmployee);
router.post("/listEmployee" ,employeeController.listEmployee);

module.exports = router;
