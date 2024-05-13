const bcrypt = require("bcryptjs");
const {
  AdminNotExist,
  ValidatePassword,
  MakeJWTToken,
} = require("../service/admin.service");
const { ExceptionHandler } = require("../libs/lib.exception");
const { AdminEmailValidator } = require("../validations/admin.validation");
const { body } = require("express-validator");
const { AdminModel } = require("../model/admin.model");

async function AdminCreate(req, res) {
  try {
    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if the email is valid
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format address" });
    }
    // Hash the password
    const passwordEncrypted = await bcrypt.hash(req.body.password, 10);
    // Create the admin
    await AdminModel.create({ ...req.body, password: passwordEncrypted });
    // Remove password from payload before sending response
    const { password, ...payload } = req.body;
    return res.status(201).json(payload);
  } catch (error) {
    console.log(error);
    // Handle exceptions
    return ExceptionHandler(error, res);
  }
}

async function AdminSignIn(req, res) {
  try {
    // Check Admin service not exist
    const Admin = await AdminNotExist(req.body.email);
    // Validate password
    await ValidatePassword(req, Admin);
    const payload = {
      email: Admin.email,
      username: Admin.username,
    };
    // Make Token JWT
    const token = MakeJWTToken(payload);
    // Return Response
    return res.status(200).json({ token, payload });
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

module.exports = {
  AdminCreate,
  AdminSignIn,
};
