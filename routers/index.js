const express = require("express");
const app = express();
const employeeRouter = require("./employeeRouter");
const otpRouter = require("./otpRouter")

app.use('/employee',employeeRouter);
app.use('/employee-otp',otpRouter);


module.exports = app;