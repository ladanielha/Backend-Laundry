const { body } = require("express-validator");
const { TransactionModel } = require("../model/transaction.model");


const TransactionCodeValidator = (target="code") => {
  return body(target)
  .exists()
  .withMessage("Field must be present!")
  .bail()
  .notEmpty()
  .withMessage("Field cannot be empty.")
  .bail()
  .isLength({ min: 7, max: 10 })
  .withMessage("Field only accepts exactly 7 characters")
  .bail()
  .custom(async (code) => {
    const order = await TransactionModel.findOne({code});
    if (order) {
      throw new Error("Code alrady exist")
    }
  })
  .bail()
}

const TransactionTotalPriceValidator = (target="totalPrice") => {
  return body(target)
    .exists()
    .withMessage("Field totalPrice harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field  totalPrice tidak boleh kosong.")
    .bail()
    .isInt()
    .withMessage("Field totalPrice harus bilangan bulat.")
    .bail()
}

const TransactionCustomerValidator = (target="customers") => {
  return body(target)
    .exists()
    .withMessage("Field customers harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field customers tidak boleh kosong.")
    .bail()
    .isObject()
    .withMessage("Format customers tidak valid.")
    .bail()
}

const TransactionItemsValidator = (target="items") => {
  return body(target)
    .exists()
    .withMessage("Field Item harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field Item tidak boleh kosong.")
    .bail()
    // .isArray({min: 1})
    // .withMessage("Minimal memiliki 1 item di dalamnya.")
    // .bail()
}


module.exports = {
  TransactionCodeValidator,
  TransactionCustomerValidator,
  TransactionItemsValidator,
  TransactionTotalPriceValidator,
}