const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { CustomerCreate, CustomerList, CustomerDetail, CustomerDetailByNomor, CustomerDelete, CustomerUpdate } = require("../controller/customer.controller");
const { CustomerCodeValidator , CustomerNameValidator, CustomerPhoneValidator, CustomerAddressValidator} = require("../validations/customer.validation");
const { CreatedAtValidator, ModifiedAtValidator } = require("../validations/item.validation");

const CustomerRouter = express.Router();

CustomerRouter.get("/", [IsAuthenticated], CustomerList)
CustomerRouter.post('/', [
  IsAuthenticated,
  Validate([
    CustomerCodeValidator(false, true, false),
    CustomerNameValidator(false),
    CustomerPhoneValidator(false)

  ])
], CustomerCreate)
CustomerRouter.get("/:id", [IsAuthenticated], CustomerDetail)
CustomerRouter.get("/by-nomor/:nomor", [IsAuthenticated], CustomerDetailByNomor)
CustomerRouter.put("/:id", [
  IsAuthenticated,
  Validate([
    CustomerCodeValidator(true, false, false),
    CustomerNameValidator(true),
    CustomerPhoneValidator(true)
  ])
], CustomerUpdate)
CustomerRouter.delete('/:id', [IsAuthenticated], CustomerDelete)
      

module.exports = {
  CustomerRouter
}