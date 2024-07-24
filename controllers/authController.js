import db from "../models/index.js";
import dotenv from "dotenv";
import statusCodes from "../constants/statusCodes.js";
import jwt from "jsonwebtoken";

dotenv.config();

const { User } = db;
const SECRET_KEY = process.env.SECRET_KEY || "VerySecret";

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "User not found" });

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
    const user = await User.create(req.body);
    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY
    );

    return res.status(statusCodes.SUCCESS).json(token);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export { signin, signup };
