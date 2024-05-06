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
  ItemCodeValidator,
  ItemNameValidator,
  ItemServiceValidator,
  ItemPriceValidator,
  CreatedAtValidator,
  ModifiedAtValidator,
} = require("../validations/item.validation");

const ItemRouter = express.Router();

ItemRouter.get("/", [IsAuthenticated], ItemList);
ItemRouter.post(
  "/",
  [
    IsAuthenticated,
    Validate([
      ItemCodeValidator(false, true, false),
      ItemNameValidator(false),
      ItemServiceValidator(false),
      ItemPriceValidator(false),
      CreatedAtValidator(false),
      ModifiedAtValidator(false),
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
      ItemCodeValidator(true, false, false),
      ItemNameValidator(true),
      ItemServiceValidator(true),
      ItemPriceValidator(true),
      CreatedAtValidator(true),
      ModifiedAtValidator(true),
    ]),
  ],
  ItemUpdate
);
ItemRouter.delete("/:id", [IsAuthenticated], ItemDelete);

module.exports = {
  ItemRouter,
};
