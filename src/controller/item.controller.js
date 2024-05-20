const {
  SearchBackend,
  FilterBackend,
  Pagination,
  GetOr404,
} = require("../libs/lib.common");
const { ExceptionHandler } = require("../libs/lib.exception");
const logger = require("../libs/lib.logger");
const { ItemModel } = require("../model/item.model");


async function ItemList(req, res) {
  try {
    const result = ItemModel.find();
    const search = SearchBackend(req, result, ["code", "name", "service"]);
    const filter = FilterBackend(req, search);
    const paging = await Pagination(req, res, filter);
    logger.info(`success get list item`);
    return res.status(200).json(paging);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

async function ItemCreate(req, res) {
  try {
    // Count Nilai
    const lastItem = await ItemModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    let lastItemNumber = 0;
    if (lastItem) {
      const lastItemCodeParts = lastItem.code.split("-");
      lastItemNumber = parseInt(lastItemCodeParts[1]);
    }
    // Generate the next Item number
    const nextItemNumber = lastItemNumber + 1;
    const nextItemCode = generateItemCode(nextItemNumber);
    // Add the code to the request body
    req.body.code = nextItemCode;
    const result = await ItemModel.create(req.body);
    logger.info(`success create new item`);
    return res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    return ExceptionHandler(error, res);
  }
}

async function ItemDetail(req, res) {
  try {
    const result = await GetOr404(ItemModel, { _id: req.params.id });
    logger.info(`success get item detail`);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
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
    logger.info(`success update item`);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return ExceptionHandler(error, res);
  }
}

async function ItemDelete(req, res) {
  try {
    await GetOr404(ItemModel, { _id: req.params.id });
    await ItemModel.findOneAndDelete({ _id: req.params.id });
    logger.warning(`success delete item`);
    return res.status(204).json(null);
  } catch (error) {
    logger.error(error);
    return ExceptionHandler(error, res);
  }
}

// Function to generate the item code
function generateItemCode(count) {
  const paddedCount = count.toString().padStart(3, "0");
  return `ITM-${paddedCount}`;
}

module.exports = {
  ItemList,
  ItemCreate,
  ItemDetail,
  ItemUpdate,
  ItemDelete,
};
