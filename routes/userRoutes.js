const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.get("/:id/posts", userController.getPostByUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
