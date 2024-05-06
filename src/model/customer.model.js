const mongoose = require("mongoose");

const CustomerObject = {
  code: { type: String, unique: true },
  name: { type: String, required: true },
  phonenumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
}

const CustomerSchema = new mongoose.Schema(CustomerObject)

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = {
  CustomerSchema,
  CustomerModel,
  CustomerObject,
}