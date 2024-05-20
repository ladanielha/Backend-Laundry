const mongoose = require("mongoose");

const VocherObject = {
  name: { type: String, required: true },
  expiredDate: { type: Date, required: true },
  nominal: { type: number, required: true },
  percentage: { type: number, required: true },
  address: { type: String, required: true }
}

const CustomerSchema = new mongoose.Schema(VocherObject)

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = {
  CustomerSchema,
  CustomerModel,
  VocherObject,
}