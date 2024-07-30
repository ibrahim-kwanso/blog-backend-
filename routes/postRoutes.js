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

router.post("/create", validate(postCreationValidationRules), createPost);
router.get("/:id", getPost);
router.get("/", getAllPosts);
router.get("/:id/comments", getCommentsByPost);
router.put("/:id", validate(postUpdateValidationRules), updatePost);
router.delete("/:id", validate(postDeleteValidationRules), deletePost);

export default router;
