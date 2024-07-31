import {StatusCodes as statusCodes} from "http-status-codes";
import { createUserService, signinService } from "../services/user.service.js";

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await signinService(email, password);
    return res.status(statusCodes.OK).json(token);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const token = await createUserService(username, email, password);
    return res.status(statusCodes.OK).json(token);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

export { signin, signup };
