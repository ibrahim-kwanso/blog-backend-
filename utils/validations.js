import { validationResult } from "express-validator";
import {StatusCodes as statusCodes} from "http-status-codes";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(statusCodes.BAD_REQUEST).json({ errors: errors.array() });

  next();
};

export {validate};