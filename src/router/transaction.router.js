const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { TransactionList, TransactionCreate, TransactionDetail, TransactionUpdate, TransactionDelete } = require("../controller/transaction.controller");

const TransactionRouter = express.Router();

TransactionRouter.get("/", [IsAuthenticated], TransactionList);
TransactionRouter.post("/",[IsAuthenticated], TransactionCreate);
TransactionRouter.get("/:id", [IsAuthenticated], TransactionDetail);

module.exports = {
  TransactionRouter,
};