const {
  SearchBackend,
  FilterBackend,
  Pagination,
  GetOr404,
} = require("../libs/lib.common");
const { ExceptionHandler } = require("../libs/lib.exception");
const { ItemModel } = require("../model/item.model");

async function ItemList(req, res) {
  try {
    const result = ItemModel.find();
    const search = SearchBackend(req, result, ["code", "name"]);
    const filter = FilterBackend(req, search);
    const paging = await Pagination(req, res, filter);
    return res.status(200).json(paging);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

async function ItemCreate(req, res) {
  try {
    const result = await ItemModel.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function ItemDetail(req, res) {
  try {
    const result = await GetOr404(ItemModel, { _id: req.params.id });
    return res.status(200).json(result);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

async function ItemUpdate(req, res) {
  try {
    await GetOr404(ItemModel, { _id: req.params.id });
    const result = await ItemModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

async function ItemDelete(req, res) {
  try {
    await GetOr404(ItemModel, { _id: req.params.id });
    await ItemModel.findOneAndDelete({ _id: req.params.id });
    return res.status(204).json(null);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

module.exports = {
    ItemList,
    ItemCreate,
    ItemDetail,
    ItemUpdate,
    ItemDelete
}
