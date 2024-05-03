const { body } = require("express-validator");
const { CustomerModel } = require("../model/customer.model");

const CustomerIDValidator = (optional = false, target = "_id") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Field must be present!").bail();
  validator.notEmpty().withMessage("Field cannot be empty.").bail();
  validator.isMongoId().withMessage("Format ID tidak valid.").bail();
  validator
    .custom(async (_id) => {
      const customer = await CustomerModel.findOne({ _id });
      if (!customer) {
        throw new Error("ID customer tidak tersedia.");
      }
    })
    .bail();

  return validator;
};

const CustomerCodeValidator = (
  optional = false,
  forCreate = true,
  forModule = false,
  target = "code"
) => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Field must be present!").bail();
  validator.notEmpty().withMessage("Field cannot be empty.").bail();
  validator
    .isLength({ min: 7, max: 7 })
    .withMessage("Field only accepts exactly 7 characters.")
    .bail();

  if (forCreate) {
    validator
      .custom(async (nomor) => {
        const customer = await CustomerModel.findOne({ nomor });
        if (customer) {
          throw new Error("Nomor sudah digunakan");
        }
      })
      .bail();
  }

  if (forModule) {
    validator
      .custom(async (nomor) => {
        const customer = await CustomerModel.findOne({ nomor });
        if (!customer) {
          throw new Error("Nomor tidak ada");
        }
      })
      .bail();
  }

  return validator;
};

const CustomerNameValidator = (optional = false, target = "name") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Field must be present!").bail();
  validator.notEmpty().withMessage("Nama tidak boleh kosong.").bail();
  validator
    .isLength({ min: 5, max: 100 })
    .withMessage("Nama tidak boleh kurang dari 5 dan lebih dari 100")
    .bail();
  return validator;
};

const CustomerPhoneValidator = (optional = false, target = "phonenumber") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Field must be present!").bail();
  validator.notEmpty().withMessage("Telepon tidak boleh kosong.").bail();
  validator
    .isLength({ min: 11, max: 13 })
    .withMessage("Nomor telepon minimal 11 karakter dan maksimal 13 karakter")
    .bail();
  return validator;
};

const CustomerAddressValidator = (optional = false, target = "address") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Field must be present!").bail();
  validator.notEmpty().withMessage("Alamat tidak boleh kosong.").bail();
  validator
    .isLength({ min: 10, max: 150 })
    .withMessage(" minimal 10 karakter dan maksimal 150 karakter")
    .bail();
  return validator;
};

module.exports = {
  CustomerIDValidator,
  CustomerNameValidator,
  CustomerAddressValidator,
  CustomerCodeValidator,
  CustomerPhoneValidator,
};
