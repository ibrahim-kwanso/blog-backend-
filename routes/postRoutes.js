import express from "express";
import {
  createPost,
  getPost,
  getAllPosts,
  getCommentsByPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
const router = express.Router();

router.post("/create", createPost);
router.get("/:id", getPost);
router.get("/", getAllPosts);
router.get("/:id/comments", getCommentsByPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
