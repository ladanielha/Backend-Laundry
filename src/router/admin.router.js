const express = require("express");
const { AdminCreate, AdminSignIn } = require("../controller/admin.controller");
const { AdminEmailValidator, AdminUsernameValidator } = require("../validations/admin.validation");

const AdminRouter = express.Router();

AdminRouter.post("/", [
  AdminUsernameValidator(),
  AdminEmailValidator(),
], AdminCreate);

AdminRouter.post("/signin", [
  AdminEmailValidator(),
], AdminSignIn);

module.exports = {
  AdminRouter
};
