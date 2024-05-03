const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { CustomerCreate, CustomerList, CustomerDetail, CustomerDetailByNomor, CustomerDelete } = require("../controller/customer.controller");
const { CustomerCodeValidator , CustomerNameValidator, CustomerPhoneValidator, CustomerAddressValidator} = require("../validations/customer.validation");
// const { CustomerCreate, CustomerList, CustomerDetail, CustomerUpdate, CustomerDelete, CustomerDetailByNomor } = require("./customer.controller");
//const { CustomerNomorValidator, CustomerNamaValidator, CustomerTeleponValidator, CustomerAlamatValidator } = require("./customer.validation");

const CustomerRouter = express.Router();

CustomerRouter.get("/", [IsAuthenticated], CustomerList)
CustomerRouter.post('/', [
  IsAuthenticated,
  Validate([
    CustomerCodeValidator(false, true, false),
    CustomerNameValidator(false),
    CustomerPhoneValidator(false),
    CustomerAddressValidator(false)
  ])
], CustomerCreate)
CustomerRouter.get("/:id", [IsAuthenticated], CustomerDetail)
CustomerRouter.get("/by-nomor/:nomor", [IsAuthenticated], CustomerDetailByNomor)
// CustomerRouter.put("/:id", [
//   IsAuthenticated,
//   Validate([
//     CustomerCodeValidator(true, false, false),
//     CustomerNamaValidator(true),
//     CustomerTeleponValidator(true),
//     CustomerAlamatValidator(true)
//   ])
// ], CustomerUpdate)
CustomerRouter.delete('/:id', [IsAuthenticated], CustomerDelete)
      

module.exports = {
  CustomerRouter
}