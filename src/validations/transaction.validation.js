// const { body } = require("express-validator");
// const { TransactionModel } = require("./order.model");

// const TransactionNomorValidator = (target = "nomor") => {
//   return body(target)
//     .exists()
//     .withMessage("Field harus tersedia!")
//     .bail()
//     .notEmpty()
//     .withMessage("Field tidak boleh kosong.")
//     .bail()
//     .isLength({ min: 6, max: 6 })
//     .withMessage("Field hanya menerima tepat 6 karakter.")
//     .bail()
//     .custom(async (nomor) => {
//       const order = await TransactionModel.findOne({ nomor });
//       if (order) {
//         throw new Error("Nomor sudah digunakan");
//       }
//     })
//     .bail();
// };

// const TransactionCustomerValidator = (target = "customer") => {
//   return body(target)
//     .exists()
//     .withMessage("Field harus tersedia!")
//     .bail()
//     .notEmpty()
//     .withMessage("Field tidak boleh kosong.")
//     .bail()
//     .isObject()
//     .withMessage("Format tidak valid.")
//     .bail();
// };

// const TransactionTanggalValidator = (target = "tanggal") => {
//   return body(target)
//     .exists()
//     .withMessage("Field harus tersedia!")
//     .bail()
//     .notEmpty()
//     .withMessage("Field tidak boleh kosong.")
//     .bail()
//     .isDate({ format: "YYYY-MM-DD" })
//     .withMessage("Format harus YYYY-MM-DD")
//     .bail();
// };

// const TransactionDibayarValidator = (target = "dibayar") => {
//   return body(target)
//     .exists()
//     .withMessage("Field harus tersedia!")
//     .bail()
//     .notEmpty()
//     .withMessage("Field tidak boleh kosong.")
//     .bail()
//     .isInt()
//     .withMessage("Field harus bilangan bulat.")
//     .bail();
// };

// const TransactionTotalValidator = (target = "total") => {
//   return body(target)
//     .exists()
//     .withMessage("Field harus tersedia!")
//     .bail()
//     .notEmpty()
//     .withMessage("Field tidak boleh kosong.")
//     .bail()
//     .isInt()
//     .withMessage("Field harus bilangan bulat.")
//     .bail();
// };

// const TransactionItemsValidator = (target = "items") => {
//   return body(target)
//     .exists()
//     .withMessage("Field harus tersedia!")
//     .bail()
//     .notEmpty()
//     .withMessage("Field tidak boleh kosong.")
//     .bail()
//     .isArray({ min: 1 })
//     .withMessage("Minimal memiliki 1 item di dalamnya.")
//     .bail();
// };

// const TransactionItemsQtyValidator = (target = "items.*.qty") => {
//   return body(target)
//     .exists()
//     .withMessage("Field harus tersedia!")
//     .bail()
//     .notEmpty()
//     .withMessage("Field tidak boleh kosong.")
//     .bail()
//     .isInt({ min: 1 })
//     .withMessage(
//       "Field harus bilangan bulat dan minimal qty pembelian sebesar 1."
//     )
//     .bail();
// };

// const TransactionItemsSubtotalValidator = (target = "items.*.subtotal") => {
//   return body(target)
//     .exists()
//     .withMessage("Field harus tersedia!")
//     .bail()
//     .notEmpty()
//     .withMessage("Field tidak boleh kosong.")
//     .bail()
//     .isInt({ min: 1 })
//     .withMessage("Field harus bilangan bulat.")
//     .bail();
// };

// module.exports = {
//   TransactionNomorValidator,
//   TransactionCustomerValidator,
//   TransactionTanggalValidator,
//   TransactionDibayarValidator,
//   TransactionTotalValidator,
//   TransactionItemsValidator,
//   TransactionItemsQtyValidator,
//   TransactionItemsSubtotalValidator,
// };
