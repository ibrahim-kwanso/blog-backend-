import { JWT_SECRET } from "../settings.js";
import {StatusCodes as statusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";

const SECRET_KEY = JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Token not provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(statusCodes.FORBIDDEN).json({ error: err.message });
    }

    req.user = user;
    next();
  });
};

export {authenticateToken};
