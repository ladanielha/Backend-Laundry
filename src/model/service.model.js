const mongoose = require('mongoose');

const ServiceObject = {
  code: { type: String, unique: true },
  name: { type: String, required: true},
  price: { type: String, required: true },
  durasi: { type: Number, required: true, },
};

const ServiceSchema = new mongoose.Schema(ServiceObject)

const ServiceModel = mongoose.model("Service", ServiceSchema);


module.exports = {
    ServiceModel,
    ServiceObject,
    ServiceSchema
}