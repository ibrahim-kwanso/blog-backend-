import express from "express";
import {
  createComment,
  getComment,
  getAllComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", createComment);
router.get("/:id", getComment);
router.get("/", getAllComments);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
