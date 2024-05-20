const mongoose = require("mongoose");
const logger = require("./lib.logger");
const { MONGO_URI } = process.env

const configDB = {
  useNewUrlParser: true
}

const MongoDBConnection = () => {
  mongoose.connect(MONGO_URI, configDB).then(() => {
  logger.info("Berhasil terhubung ke database mongoDB");
}).catch((error) => {
    logger.info("Gagal terkoneksi database mongoDB");
    console.error(error);
  })
}

module.exports = {
  MongoDBConnection
}