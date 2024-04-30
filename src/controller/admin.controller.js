const bcrypt = require("bcryptjs");
const {
  AdminNotExist,
  ValidatePassword,
  MakeJWTToken,
} = require("../service/admin.service");
const { ExceptionHandler } = require("../libs/lib.exception");
const { AdminModel } = require("../model/admin.model");

async function AdminCreate(req, res) {
  try {
    const passwordEncrypted = await bcrypt.hash(req.body.password, 10);
    await AdminModel.create({ ...req.body, password: passwordEncrypted });
    const { password, ...payload } = req.body;
    return res.status(201).json(payload);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function AdminSignIn(req, res) {
  try {
    // Admin service not exist
    const Admin = await AdminNotExist(req.body.email);
    // validate password
    await ValidatePassword(req, Admin);
    const payload = {
      email: Admin.email,
      username: Admin.username,
    };
    // proses pembuatan token
    const token = MakeJWTToken(payload);
    // return response
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

module.exports = {
  AdminCreate,
  AdminSignIn,
};
