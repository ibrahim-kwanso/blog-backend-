import { body, param, validationResult } from "express-validator";

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
  param("id").isInt().withMessage("id is not valid"),
  body("username").optional().notEmpty().withMessage("Username is required"),
  body("email").optional().isEmail().withMessage("Email is required"),
  body("password").optional()
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long"),
];

const userDeleteValidationRules = [
    param("id").isInt().withMessage("id is not valid")
]

export { signupValidationRules, siginValidationRules, userUpdateValidationRules, userDeleteValidationRules };
