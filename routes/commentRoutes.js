import express from "express";
import {
  createComment,
  getComment,
  getAllComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import {
  commentCreationValidationRules,
  commentUpdateValidationRules,
  commentDeleteValidationRules,
} from "../middlewares/validators/comment.validator.js";
import { validate } from "../utils/validations.js";

const router = express.Router();

router.post("/create", commentCreationValidationRules, validate, createComment);
router.get("/:id", getComment);
router.get("/", getAllComments);
router.put("/:id", commentUpdateValidationRules, validate, updateComment);
router.delete("/:id", commentDeleteValidationRules, validate, deleteComment);

export default router;
