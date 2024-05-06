const express = require("express");
const { IsAuthenticated } = require("../libs/lib.middleware");
const { ItemList, ItemCreate, ItemDetail, ItemUpdate, ItemDelete } = require("../controller/item.controller");

const ItemRouter = express.Router();

ItemRouter.get("/", [IsAuthenticated], ItemList);
ItemRouter.post("/", [IsAuthenticated], ItemCreate);
ItemRouter.get("/:id", [IsAuthenticated], ItemDetail);
ItemRouter.put("/:id", [IsAuthenticated], ItemUpdate);
ItemRouter.delete("/:id", [IsAuthenticated], ItemDelete);

module.exports = {
    ItemRouter
}

