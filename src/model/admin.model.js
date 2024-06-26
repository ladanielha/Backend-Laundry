  const mongoose = require("mongoose");

const AdminObject = {
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
}

const AdminSchema = new mongoose.Schema(AdminObject, { timestamps: true });

const AdminModel = new mongoose.model('admin', AdminSchema);

module.exports = {
  AdminObject,
  AdminSchema,
  AdminModel
}