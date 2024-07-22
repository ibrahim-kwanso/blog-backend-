const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/create", postController.createPost);
router.get("/:id", postController.getPost);
router.get("/", postController.getAllPosts);
router.get("/:id/comments", postController.getCommentsByPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost)


module.exports = router;
