import express from "express";
import {
  createUser,
  getPostByUser,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  userUpdateValidationRules,
  userDeleteValidationRules,
} from "../middlewares/validators/user.validator.js";
import { validate } from "../utils/validations.js";

const router = express.Router();

router.post("/create", createUser);
router.get("/:id/posts", getPostByUser);
router.get("/:id", getUser);
router.get("/", getAllUser);
router.put("/:id", validate(userUpdateValidationRules), updateUser);
router.delete("/:id", validate(userDeleteValidationRules), deleteUser);

export default router;
