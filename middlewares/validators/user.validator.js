import { body, validationResult } from "express-validator";
import statusCodes from "../../constants/statusCodes.js";

const signupValidationRules = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long"),
];

const siginValidationRules = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required."),
];

const userUpdateValidationRules = [
  body("id").isInt().withMessage("id is not valid"),
  body("username").optional().notEmpty().withMessage("Username is required"),
  body("email").optional().isEmail().withMessage("Email is required"),
  body("password").optional()
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long"),
];

const userDeleteValidationRules = [
    body("id").isInt().withMessage("id is not valid")
]

export { signupValidationRules, siginValidationRules, userUpdateValidationRules, userDeleteValidationRules };
