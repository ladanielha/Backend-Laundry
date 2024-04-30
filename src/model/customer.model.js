const mongoose = require("mongoose");

const CustomerObject = {
  nomor: { type: String, unique: true },
  nama: { type: String, required: true },
  alamat: { type: String, required: true },
  telepon: { type: String, required: true }
}

const CustomerSchema = new mongoose.Schema(CustomerObject)

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = {
  CustomerSchema,
  CustomerModel,
  CustomerObject,
}