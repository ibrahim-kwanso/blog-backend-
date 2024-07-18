const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
