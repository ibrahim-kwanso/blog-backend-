const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/create", postController.createPost);
router.get("/:id", postController.getPost);
router.get("/", postController.getPostByUser);

module.exports = router;
