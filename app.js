const express = require("express");
const { MongoDBConnection } = require("./src/libs/lib.database");
// const { BarangRouter } = require("./barang/barang.router");
// const { ROUTER_BASE_BARANG } = require("./barang/barang.config");
const { AdminRouter } = require("./src/router/admin.router");
const { ROUTER_BASE_ADMIN } = require("./src/config/admin.config");
const { ROUTER_BASE_CUSTOMER } = require("./src/config/customer.config");
const { CustomerRouter } = require("./src/router/customer.router");

// const { ROUTER_BASE_ORDER } = require("./order/order.config");
// const { OrderRouter } = require("./order/order.router");
const cors = require("cors");
const app = express();

MongoDBConnection();

app.use(express.json());
app.use(cors({
  origin:"*"
}));

// app.use(ROUTER_BASE_BARANG, BarangRouter);
app.use(ROUTER_BASE_ADMIN, AdminRouter);
app.use(ROUTER_BASE_CUSTOMER, CustomerRouter);
// app.use(ROUTER_BASE_ORDER, OrderRouter)


module.exports = {
  app
}