const { body } = require("express-validator");
const { ItemModel } = require("../model/item.model");



const ItemCodeValidator = (
  optional = false,
  forCreate = true,
  forModule = false,
  target = "code"
) => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Code must be present!").bail();
  validator.notEmpty().withMessage("Code cannot be empty.").bail();
  validator
    .isLength({ min: 7, max: 7 })
    .withMessage("Field only accepts exactly 7 characters.")
    .bail();

  if (forCreate) {
    validator
      .custom(async (code) => {
        const item = await ItemModel.findOne({ code });
        if (item) {
          throw new Error("Code already exist");
        }
      })
      .bail();
  }

  if (forModule) {
    validator
      .custom(async (code) => {
        const item = await ItemModel.findOne({ code });
        if (!item) {
          throw new Error("Code has not been registered in the database");
        }
      })
      .bail();
  }

  return validator;
};

const ItemNameValidator = (optional = false, target = "name") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Name must be present").bail();
  validator.notEmpty().withMessage("Nama tidak boleh kosong.").bail();
  validator
    .isLength({ min: 3, max: 100 })
    .withMessage("Nama tidak boleh kurang dari 3 dan lebih dari 100 karakter")
    .bail();

  return validator;
};

const ItemServiceValidator = (optional = false, target = "service") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Price must be present").bail();
  validator.notEmpty().withMessage("Field tidak boleh kosong.").bail();
  validator
    .isLength({ min: 3, max: 100 })
    .withMessage("Nama tidak boleh kurang dari 3 dan lebih dari 100 karakter")
    .bail();
  return validator;
};

const ItemPriceValidator = (optional = false, target = "price") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Price must be present").bail();
  validator.notEmpty().withMessage("Price tidak boleh kosong.").bail();
  validator
    .isInt({ min: 1000 })
    .withMessage("Format must be number and greater than 1000.")
    .bail();

  return validator;
};

const CreatedAtValidator = (optional= false, target = "createdAt") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }
  validator.exists().withMessage("createdAt must be present").bail();
  validator.notEmpty().withMessage("createdAt can't empty!").bail();
  validator
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Format date must be YYYY-MM-DD")
    .bail();

  return validator;
};
const ModifiedAtValidator = (optional= false, target = "modifiedAt") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }
  validator.exists().withMessage("Field must be present").bail();
  validator.notEmpty().withMessage("modifiedAt Field can't empty!").bail();
  validator
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Format date must be YYYY-MM-DD")
    .bail();

  return validator;
};


module.exports = {
  ItemCodeValidator,
  ItemNameValidator,
  ItemPriceValidator,
  ItemServiceValidator,
  CreatedAtValidator,
  ModifiedAtValidator,
};
