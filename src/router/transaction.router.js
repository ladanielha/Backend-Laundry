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
      CustomerCodeValidator(true, "customer.code"),
      CustomerIDValidator("customers._id"),
      CustomerNameValidator("customer.name"),
      CustomerPhoneValidator("customer.phonenumber"),
      ItemCodeValidator(true, "item.*.code"),
      ItemNameValidator("item.*.name"),
      ItemServiceValidator("item.*.service"),
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
