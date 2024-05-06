const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { TransactionCreate, TransactionDetail, TransactionList } = require("./order.controller");
const {
  TransactionNomorValidator,
  TransactionTanggalValidator,
  TransactionTransactionValidator,
  TransactionItemsValidator,
  TransactionItemsQtyValidator,
  TransactionItemsSubtotalValidator,
} = require("./order.validation");
const {
  TransactionNomorValidator,
  TransactionNamaValidator,
  TransactionAlamatValidator,
  TransactionTeleponValidator,
  TransactionIDValidator,
} = require("../customer/customer.validation");
const {
  BarangNomorValidator,
  BarangNamaValidator,
  BarangSatuanValidator,
  BarangHargaJualValidator,
  BarangStokValidator,
  BarangIDValidator,
} = require("../barang/barang.validation");

const TransactionRouter = express.Router();

TransactionRouter.get("/", [IsAuthenticated], TransactionList);
TransactionRouter.post(
  "/",
  [
    IsAuthenticated,
    Validate([
      TransactionNomorValidator(),
      TransactionTanggalValidator(),
      TransactionTransactionValidator(),
      TransactionNomorValidator(true, "customer.nomor"),
      TransactionIDValidator("customer._id"),
      TransactionNamaValidator("customer.nama"),
      TransactionAlamatValidator("customer.alamat"),
      TransactionTeleponValidator("customer.telepon"),
      TransactionItemsValidator(),
      TransactionItemsQtyValidator(),
      TransactionItemsSubtotalValidator(),
      BarangNomorValidator(true, "items.*.nomor"),
      BarangIDValidator("items.*._id"),
      BarangNamaValidator("items.*.nama"),
      BarangSatuanValidator("items.*.satuan"),
      BarangHargaJualValidator("items.*.hargaJual"),
      BarangStokValidator("items.*.stok"),
    ]),
  ],
  TransactionCreate
);
TransactionRouter.get("/:id", [IsAuthenticated], TransactionDetail);
TransactionRouter.put(
  "/:id",
  [
    IsAuthenticated,
    Validate([
      TransactionNomorValidator(true, false, false),
      TransactionNamaValidator(true),
      TransactionTeleponValidator(true),
      TransactionAlamatValidator(true),
    ]),
  ],
  TransactionUpdate
);

TransactionRouter.delete("/:id", [IsAuthenticated], TransactionDelete);

module.exports = {
  TransactionRouter,
};
