const express = require("express");
const { ServiceList, ServiceCreate, ServiceDetail } = require("../controller/service.controller");
const { IsAuthenticated } = require("../libs/lib.middleware");

const ServiceRouter = express.Router();

ServiceRouter.get("/", [IsAuthenticated], ServiceList)
ServiceRouter.post('/', [IsAuthenticated], ServiceCreate)
ServiceRouter.get("/:id", [IsAuthenticated], ServiceDetail)
// ServiceRouter.put("/:id", [
//   IsAuthenticated,
// ],ServiceUpdate)
ServiceRouter.delete('/:id', [IsAuthenticated], ServiceRouter)

module.exports = {
    ServiceRouter
}