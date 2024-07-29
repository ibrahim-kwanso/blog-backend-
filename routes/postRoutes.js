import express from "express";
import {
  createPost,
  getPost,
  getAllPosts,
  getCommentsByPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import {
  postCreationValidationRules,
  postUpdateValidationRules,
  postDeleteValidationRules,
} from "../middlewares/validators/post.validator.js";
import { validate } from "../utils/validations.js";
const router = express.Router();

router.post("/create", postCreationValidationRules, validate, createPost);
router.get("/:id", getPost);
router.get("/", getAllPosts);
router.get("/:id/comments", getCommentsByPost);
router.put("/:id", postUpdateValidationRules, validate, updatePost);
router.delete("/:id", postDeleteValidationRules, validate, deletePost);

export default router;
