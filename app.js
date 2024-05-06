const express = require("express");
const { MongoDBConnection } = require("./src/libs/lib.database");
const { AdminRouter } = require("./src/router/admin.router");
const { ROUTER_BASE_ADMIN } = require("./src/config/admin.config");
const { ROUTER_BASE_CUSTOMER } = require("./src/config/customer.config");
const { CustomerRouter } = require("./src/router/customer.router");
const { ROUTER_BASE_SERVICE } = require("./src/config/service.config");
const { ServiceRouter } = require("./src/router/service.router");
const { ROUTER_BASE_ITEM } = require("./src/config/item.config");
const { ItemRouter } = require("./src/router/item.router");
const cors = require("cors");
const { ROUTER_BASE_TRANSACTION } = require("./src/config/transaction.config");
const { TransactionRouter } = require("./src/router/transaction.router");

const app = express();

MongoDBConnection();

app.use(express.json());
app.use(cors({
  origin:"*"
}));

app.use(ROUTER_BASE_ADMIN, AdminRouter);
app.use(ROUTER_BASE_CUSTOMER, CustomerRouter);
app.use(ROUTER_BASE_SERVICE, ServiceRouter);
app.use(ROUTER_BASE_ITEM, ItemRouter);
app.use(ROUTER_BASE_TRANSACTION, TransactionRouter)
  
module.exports = {
  app
}