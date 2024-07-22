const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/create", commentController.createComment);
router.get("/:id", commentController.getComment);
router.get("/", commentController.getAllComments);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
