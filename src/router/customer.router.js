// const express = require("express");
// const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
// const { CustomerCreate, CustomerList, CustomerDetail, CustomerUpdate, CustomerDelete, CustomerDetailByNomor } = require("./customer.controller");
// const { CustomerNomorValidator, CustomerNamaValidator, CustomerTeleponValidator, CustomerAlamatValidator } = require("./customer.validation");

// const CustomerRouter = express.Router();

// CustomerRouter.get("/", [IsAuthenticated], CustomerList)
// CustomerRouter.post('/', [
//   IsAuthenticated,
//   Validate([
//     CustomerNomorValidator(false, true, false),
//     CustomerNamaValidator(false),
//     CustomerTeleponValidator(false),
//     CustomerAlamatValidator(false)
//   ])
// ], CustomerCreate)
// CustomerRouter.get("/:id", [IsAuthenticated], CustomerDetail)
// CustomerRouter.get("/by-nomor/:nomor", [IsAuthenticated], CustomerDetailByNomor)
// CustomerRouter.put("/:id", [
//   IsAuthenticated,
//   Validate([
//     CustomerNomorValidator(true, false, false),
//     CustomerNamaValidator(true),
//     CustomerTeleponValidator(true),
//     CustomerAlamatValidator(true)
//   ])
// ], CustomerUpdate)
// CustomerRouter.delete('/:id', [IsAuthenticated], CustomerDelete)


// module.exports = {
//   CustomerRouter
// }