const {body} = require("express-validator");
const { AdminModel } = require("../model/admin.model");

const AdminUsernameValidator =(optional=false, target="username") => {
    const validator = body(target);

    if(optional) {
        validator.optional
    }
    validator.exists().withMessage("Field can't empty!").bail();
    validator.notEmpty().withMessage("Username can't be empty!").bail();
    validator
    .isLength({ min: 5, max: 100 })
    .withMessage("Username must have 5 - 100 characters")
    .bail();
  return validator;
}

const AdminEmailValidator = ( target = "email") => {
    const validator = body(target);

    validator.exists().withMessage("Field can't be empty!").bail();
    validator.notEmpty().withMessage("Email can't be empty!").bail();    
    validator.custom((value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error("Invalid email format");
        }
        return true;
    });

    return validator;
};

module.exports = {
    AdminEmailValidator,
    AdminUsernameValidator
}
