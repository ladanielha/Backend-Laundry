const mongoose = require("mongoose");

const ItemObject = {
  code: { type: String, unique: true },
  name: { type: String, required: true },
  service: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
}

const ItemSchema = new mongoose.Schema(ItemObject, { timestamps: true });

const ItemModel = mongoose.model("Item", ItemSchema);

module.exports = {
  ItemSchema,
  ItemModel,
  ItemObject,
}