import { body, param } from "express-validator";

const commentCreationValidationRules = [
    body("UserId").isInt().withMessage("UserId is not valid"),
    body("PostId").isInt().withMessage("PostId is not valid"),
    body("ParentId").isInt().withMessage("ParentId is not valid"),
    body("content").notEmpty().withMessage("content cannot be empty")
]

const commentUpdateValidationRules = [
    param("id").isInt().withMessage("id is not valid"),
    body("content").notEmpty().withMessage("content cannot be empty")
]

const commentDeleteValidationRules = [
    param("id").isInt().withMessage("id is not valid")
]

export {commentCreationValidationRules, commentUpdateValidationRules, commentDeleteValidationRules}