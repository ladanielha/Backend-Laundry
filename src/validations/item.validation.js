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
  
    validator.exists().withMessage("Field must be present!").bail();
    validator.notEmpty().withMessage("Field cannot be empty.").bail();
    validator
      .isLength({ min: 7, max: 7 })
      .withMessage("Field only accepts exactly 7 characters.")
      .bail();
  
    if (forCreate) {
      validator
        .custom(async (code) => {
          const customer = await ItemModel.findOne({ code });
          if (customer) {
            throw new Error("Code already exist");
          }
        })
        .bail();
    }
    
  if (forModule) {
    validator
      .custom(async (code) => {
        const customer = await ItemModel.findOne({ code });
        if (!customer) {
          throw new Error("Code has not been registered in the database");
        }
      })
      .bail();
  }

  return validator;
};