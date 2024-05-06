const mongoose = require("mongoose");
const { CustomerObject } = require("../model/customer.model");
const { ItemObject } = require("../model/item.model");
const { VoucherObject } = require("../model/voucher.model");
const { AdminObject } = require("../model/admin.model");

const TransactionObject = {
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  modifiedAt: { type: Date, required: true },
  customers: new mongoose.Schema({
    ...CustomerObject,
    code: { type: String, unique: true },
    name: { type: String, required: true },
    phonenumber: { type: String, required: true },
    address: { type: String, required: false },
  }),
  items: new mongoose.Schema({
    ...ItemObject,
    code: { type: String, unique: true },
    name: { type: String, required: true },
    service: { type: String, required: true },
    price: { type: String, required: true },
    address: { type: String, required: true },
  }),

  admin: new mongoose.Schema({
    ...AdminObject,
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
  }),
};

const TransactionSchema = new mongoose.Schema(TransactionObject);

const TransactionModel = new mongoose.model("Transaction", TransactionSchema);

module.exports = {
  TransactionObject,
  TransactionSchema,
  TransactionModel,
};
