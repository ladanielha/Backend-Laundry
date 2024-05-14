const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const {
  TransactionList,
  TransactionCreate,
  TransactionDetail,
} = require("../controller/transaction.controller");
const { TransactionCodeValidator, TransactionTotalPriceValidator, TransactionCustomerValidator, TransactionItemsValidator } = require("../validations/transaction.validation");
const { CustomerCodeValidator, CustomerNameValidator, CustomerPhoneValidator, CustomerIDValidator } = require("../validations/customer.validation");
const { ItemCodeValidator, ItemNameValidator, ItemServiceValidator, ItemPriceValidator } = require("../validations/item.validation");
const { AdminUsernameValidator } = require("../validations/admin.validation");

const TransactionRouter = express.Router();

TransactionRouter.get("/", [IsAuthenticated], TransactionList);
TransactionRouter.post(
  "/",
  [
    IsAuthenticated,
    Validate([
      TransactionTotalPriceValidator(),
      TransactionCustomerValidator(),
      TransactionItemsValidator(),
      CustomerIDValidator("customers._id"),
      CustomerNameValidator("customers.name"),
      CustomerPhoneValidator(true,"customers.phonenumber"),
      ItemNameValidator("items.*.name"),
      ItemServiceValidator("items.*.service"),
      ItemPriceValidator("items.*.price"),
      AdminUsernameValidator(true, "admin.username"),
    ])
  ],
  TransactionCreate
);
TransactionRouter.get("/:id", [IsAuthenticated], TransactionDetail);

module.exports = {
  TransactionRouter,
};
