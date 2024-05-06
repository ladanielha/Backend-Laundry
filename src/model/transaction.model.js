const mongoose = require("mongoose");
const { CustomerObject } = require("../model/customer.model");
const { ItemObject } = require("../model/item.model");
const { AdminObject } = require("./admin.model");
const { uniqueId } = require("lodash");

const TransactionObject = {
  code: {type:String, require:true , unique:true},
  totalPrice: { type: Number, required: true },
  customers: new mongoose.Schema({
    ...CustomerObject,
    code: { type: String, required: true },
  }),
  items: new mongoose.Schema({
    ...ItemObject,
    code: { type: String, required: true },
    price: { type: String, required: true },
  }),   
  admin: new mongoose.Schema({
    // ...AdminObject,
    username: { type: String, required: true },
  }),
};

const TransactionSchema = new mongoose.Schema(TransactionObject, { timestamps: true });

const TransactionModel = new mongoose.model("Transaction", TransactionSchema);

module.exports = {
  TransactionObject,
  TransactionSchema,
  TransactionModel,
};