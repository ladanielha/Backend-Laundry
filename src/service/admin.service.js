const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Error401 } = require("../libs/lib.exception");
const { AdminModel } = require("../model/admin.model");

const AdminNotExist = async (email) => {
  const result = await AdminModel.findOne({ email })

  if (!result) {
    // throw new Error("Email tidak terdaftar");
    throw new Error401("Email tidak terdaftar.")
  }

  return result;
}

const ValidatePassword = async (req, user) => {
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    // throw new Error("Password tidak cocok");
    throw new Error401("Password salah.")
  }
}

const MakeJWTToken =  (payload) => {
  const token = jwt.sign(
    payload, 
    process.env.TOKEN_KEY,
    { expiresIn: "2h" }
  )

  return token;
} 

module.exports = {
  AdminNotExist,
  ValidatePassword,
  MakeJWTToken
}