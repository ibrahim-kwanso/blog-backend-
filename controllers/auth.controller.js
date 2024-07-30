import User from "../models/user.js";
import dotenv from "dotenv";
import statusCodes from "../constants/statusCodes.js";
import jwt from "jsonwebtoken";
import { createUserService } from "../services/user.service.js";
import bcrypt from "bcrypt";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "VerySecret";

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email
      },
    });

    if (!user)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "Invalid Email or Password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY
    );
    return res.status(statusCodes.SUCCESS).json(token);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const user = await createUserService(username, email, password);
    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY
    );

    return res.status(statusCodes.SUCCESS).json(token);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

export { signin, signup };
