const express = require("express");
const { AdminCreate, AdminSignIn } = require("../controller/admin.controller");

const AdminRouter = express.Router();

AdminRouter.post("/", AdminCreate);
AdminRouter.post("/signin", AdminSignIn)

module.exports = {
  AdminRouter
}
