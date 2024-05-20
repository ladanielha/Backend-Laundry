const mongoose = require("mongoose");

const CustomerObject = {
  code: { type: String, unique: true },
  name: { type: String, required: true },
  phonenumber: { type: String, required: true, unique:true},
  createdAt: { type: Date },
  modifiedAt: { type: Date },
}

const CustomerSchema = new mongoose.Schema(CustomerObject, { timestamps: true })

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = {
  CustomerSchema,
  CustomerModel,
  CustomerObject,
}