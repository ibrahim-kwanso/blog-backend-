import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import {
  signupValidationRules,
  siginValidationRules,
} from "../middlewares/validators/user.validator.js";
import { validate } from "../utils/validations.js";
const router = express.Router();

router.post("/signin", validate(siginValidationRules), signin);
router.post("/signup", validate(signupValidationRules), signup);

export default router;
