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

router.post("/create", validate(commentCreationValidationRules), createComment);
router.get("/:id", getComment);
router.get("/", getAllComments);
router.put("/:id", validate(commentUpdateValidationRules), updateComment);
router.delete("/:id", validate(commentDeleteValidationRules), deleteComment);

export default router;
