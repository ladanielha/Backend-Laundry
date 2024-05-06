const {
  Pagination,
  SearchBackend,
  FilterBackend,
  GetOr404,
} = require("../libs/lib.common");
const { ExceptionHandler } = require("../libs/lib.exception");
const { ItemModel } = require("./Item.model");

async function ItemList(req, res) {
  try {
    const result = ItemModel.find();
    const search = SearchBackend(req, result, ["nomor", "nama", "satuan"]);
    const filter = FilterBackend(req, search);
    const paging = await Pagination(req, res, filter);
    return res.status(200).json(paging);
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function ItemDetailByNomor(req, res) {
  try {
    const result = await GetOr404(ItemModel, { nomor: req.params.nomor });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function ItemDelete(req, res) {
  try {
    await GetOr404(ItemModel, { _id: req.params.id });
    await ItemModel.findOneAndDelete({ _id: req.params.id });
    return res.status(204).json(null);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

module.exports = {
  ItemList,
  ItemCreate,
  ItemDetail,
  ItemUpdate,
  ItemDelete,
  ItemDetailByNomor,
};
