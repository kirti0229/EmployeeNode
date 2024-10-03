const { string } = require("joi");
const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        email: {
            type: String,
            validate: {
                validator: validator.isEmail,
                message: "{VALUE} is not a valid email",
            },
            required: true,
            index: true,
            unique: true,
        },
        password: {
            type: String,
            default: null,
        },
        role: {
            type: String,
        },
        otp: {
            type: String,
        },
        otpCreatedAt:Date,
       
        isActive: {
            type: Boolean,
            required: true,
            index: true,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.model("User", employeeSchema);
module.exports = Employee;