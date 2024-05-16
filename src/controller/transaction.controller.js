const { log } = require("winston");
const {
  Pagination,
  SearchBackend,
  FilterBackend,
  GetOr404,
} = require("../libs/lib.common");
const { ExceptionHandler } = require("../libs/lib.exception");
const logger = require("../libs/lib.logger");
const { TransactionModel } = require("../model/transaction.model");
const twilio = require("twilio");
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendWhatsAppMessage(to, body) {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${to}`,
      body: body,
    });
    logger.info(`WhatsApp message sent: ${message.sid}`);
    return message.sid;
  } catch (error) {
    logger.error(`Failed to send WhatsApp message: ${error.message}`);
    throw error;
  }
}

async function TransactionList(req, res) {
  try {
    const result = TransactionModel.find();
    const search = SearchBackend(req, result, ["code", "customers.name"]);
    const filter = FilterBackend(req, search);
    const paging = await Pagination(req, res, filter);
    logger.info(`success get list transaction`);
    return res.status(200).json(paging);
  } catch (error) {
    logger.error(error);
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
    // Send WhatsApp message
    const customerPhoneNumber = "+6287825389910";
    const messageBody = `
Kode Pesanan : ${req.body.code}
Layanan      : ${req.body.items.name}
Waktu Proses : ${req.body.items.service} \n \n
Pesanan Anda akan diproses dalam waktu ${req.body.items.service}. \n\n
Terima kasih telah menggunakan layanan kami!
  `;
    await sendWhatsAppMessage(customerPhoneNumber, messageBody);

    logger.info(`success create new transaction`);
    const result = await TransactionModel.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    return ExceptionHandler(error, res);
  }
}

async function TransactionDetail(req, res) {
  try {
    const result = await GetOr404(TransactionModel, { _id: req.params.id });
    return res.status(200).json(result);
  } catch (error) {
    logger.log(error);
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
    logger.log(error);
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
    logger.log(error);
    return ExceptionHandler(error, res);
  }
}

async function TransactionDelete(req, res) {
  try {
    await GetOr404(TransactionModel, { _id: req.params.id });
    await TransactionModel.findOneAndDelete({ _id: req.params.id });

    return res.status(204).json(null);
  } catch (error) {
    logger.log(error);
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
