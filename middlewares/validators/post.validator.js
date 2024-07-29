import { body, param, validationResult } from "express-validator";

const postCreationValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
];

const postUpdateValidationRules = [
  param("id").isInt().withMessage("id is not valid"),
  body("title").optional().notEmpty().withMessage("title cannot be empty"),
  body("content").optional().notEmpty().withMessage("content cannot be empty"),
];

const postDeleteValidationRules = [
  param("id").isInt().withMessage("id is not valid"),
];

export {postCreationValidationRules, postUpdateValidationRules, postDeleteValidationRules};
