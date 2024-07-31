import User from "../models/user.js";
import { StatusCodes as statusCodes } from "http-status-codes";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../settings.js";

const createUserService = async (username, email, password) => {
  try {
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  } catch (error) {
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const getUserService = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user) return user;

    throw new ApiError("User Not Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const getAllUsersService = async () => {
  try {
    const allUsers = await User.findAll();

    if (allUsers) return allUsers;

    throw new ApiError("No Users Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const updateUserService = async (id, updateData) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new ApiError("User Not Found", statusCodes.NOT_FOUND);
    }

    user.set(updateData);
    const updatedUser = await user.save({ individualHooks: true });

    return updatedUser;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const deleteUserService = async (id) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: id,
      },
    });

    if (deletedUser) return deletedUser;

    throw new ApiError("User Not Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const signinService = async (email, password) => {
  try {
    const user = await User.scope("withPassword").findOne({
      where: {
        email: email,
      },
    });

    if (!user) throw new ApiError("Invalid Credentials", statusCodes.NOT_FOUND);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      throw new ApiError("Invalid Credentials", statusCodes.NOT_FOUND);

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

    return token;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

export {
  createUserService,
  getUserService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
  signinService,
};
