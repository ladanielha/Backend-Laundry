const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const {
  ItemList,
  ItemCreate,
  ItemDetail,
  ItemUpdate,
  ItemDelete,
} = require("../controller/item.controller");
const {
  ItemNameValidator,
  ItemServiceValidator,
  ItemPriceValidator,
} = require("../validations/item.validation");

const ItemRouter = express.Router();

ItemRouter.get("/", [IsAuthenticated], ItemList);
ItemRouter.post(
  "/",
  [
    IsAuthenticated,
    Validate([
      ItemNameValidator(false),
      ItemServiceValidator(false),
      ItemPriceValidator(false),
    ]),
  ],
  ItemCreate
);
ItemRouter.get("/:id", [IsAuthenticated], ItemDetail);
ItemRouter.put(
  "/:id",
  [
    IsAuthenticated,
    Validate([
      ItemNameValidator(true),
      ItemServiceValidator(true),
      ItemPriceValidator(true),
    ]),
  ],
  ItemUpdate
);
ItemRouter.delete("/:id", [IsAuthenticated], ItemDelete);

module.exports = {
  ItemRouter,
};
