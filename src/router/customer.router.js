const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { CustomerCreate, CustomerList, CustomerDetail, CustomerDetailByNomor, CustomerDelete, CustomerUpdate } = require("../controller/customer.controller");
const { CustomerCodeValidator , CustomerNameValidator, CustomerPhoneValidator, CustomerAddressValidator} = require("../validations/customer.validation");

const CustomerRouter = express.Router();

CustomerRouter.get("/", [IsAuthenticated], CustomerList)
CustomerRouter.post('/', [
  IsAuthenticated,
  Validate([
    CustomerNameValidator(false),
    CustomerPhoneValidator(false)
  ])
], CustomerCreate)
CustomerRouter.get("/:id", [IsAuthenticated], CustomerDetail)
CustomerRouter.get("/by-nomor/:nomor", [IsAuthenticated], CustomerDetailByNomor)
CustomerRouter.put("/:id", [
  IsAuthenticated,
  Validate([
    CustomerNameValidator(true),
    CustomerPhoneValidator(true)
  ])
], CustomerUpdate)
CustomerRouter.delete('/:id', [IsAuthenticated], CustomerDelete)
      

module.exports = {
  CustomerRouter
}