const {
  Pagination,
  SearchBackend,
  FilterBackend,
  GetOr404,
} = require("../libs/lib.common");
const { ExceptionHandler } = require("../libs/lib.exception");
const { TransactionModel } = require("../model/transaction.model");

async function TransactionList(req, res) {
  try {
    const result = TransactionModel.find();
    const search = SearchBackend(req, result, ["code", "customers.name"]);
    const filter = FilterBackend(req, search);
    const paging = await Pagination(req, res, filter);
    return res.status(200).json(paging);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function TransactionCreate(req, res) {
  try {
    const lastTransaction = await TransactionModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    let lastTransactionNumber = 0;
    if (lastTransaction) {
      const lastTransactionCodeParts = lastTransaction.code.split("-");
      lastTransactionNumber = parseInt(lastTransactionCodeParts[1]);
    }
    const nextTransactionNumber = lastTransactionNumber + 1;
    const nextTransactionCode = generateTransactionCode(nextTransactionNumber);
    req.body.code = nextTransactionCode;
    console.log(res.body)
    const result = await TransactionModel.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function TransactionDetail(req, res) {
  try {
    const result = await GetOr404(TransactionModel, { _id: req.params.id });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function TransactionDetailByNomor(req, res) {
  try {
    const result = await GetOr404(TransactionModel, {
      nomor: req.params.nomor,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function TransactionUpdate(req, res) {
  try {
    await GetOr404(TransactionModel, { _id: req.params.id });
    const result = await TransactionModel.findOneAndUpdate(
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

async function TransactionDelete(req, res) {
  try {
    await GetOr404(TransactionModel, { _id: req.params.id });
    await TransactionModel.findOneAndDelete({ _id: req.params.id });
    return res.status(204).json(null);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

// Function to generate the item code
function generateTransactionCode(count) {
  const paddedCount = count.toString().padStart(3, "0");
  return `TRX-${paddedCount}`;
}

module.exports = {
  TransactionList,
  TransactionCreate,
  TransactionDetail,
  TransactionUpdate,
  TransactionDelete,
  TransactionDetailByNomor,
};
