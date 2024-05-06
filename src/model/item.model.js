const mongoose = require("mongoose");

const ItemObject = {
  code: { type: String, unique: true },
  name: { type: String, required: true },
  service: { type: String, required: true },
  price: { type: String, required: true },
  address: { type: String, required: true }
}

const ItemSchema = new mongoose.Schema(ItemObject)

const ItemModel = mongoose.model("Item", ItemSchema);

module.exports = {
  ItemSchema,
  ItemModel,
  ItemObject,
}