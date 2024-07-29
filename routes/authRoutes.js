import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import {
  signupValidationRules,
  siginValidationRules,
} from "../middlewares/validators/user.validator.js";
import { validate } from "../utils/validations.js";
const router = express.Router();

router.post("/signin", siginValidationRules, validate, signin);
router.post("/signup", signupValidationRules, validate, signup);

export default router;
