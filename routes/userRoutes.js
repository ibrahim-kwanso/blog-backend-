import express from "express";
import {
  createUser,
  getPostByUser,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/create", createUser);
router.get("/:id/posts", getPostByUser);
router.get("/:id", getUser);
router.get("/", getAllUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
