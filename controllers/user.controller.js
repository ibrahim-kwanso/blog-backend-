import statusCodes from "../constants/statusCodes.js";
import { applyPagination } from "../utils/index.js";
import {
  createUserService,
  getUserService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
} from "../services/user.service.js";
import { getPostsByUserService } from "../services/post.service.js";

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await createUserService(username, email, password);
    return res.status(statusCodes.CREATED).json(user);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

const getPostByUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const [totalItems, posts] = await getPostsByUserService(req.params.id, page, pageSize);

    return res
      .status(statusCodes.SUCCESS)
      .json(applyPagination(req, posts, page, pageSize, totalItems));
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserService(req.params.id);
    return res.status(statusCodes.SUCCESS).json(user);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUsers = await getAllUsersService();
    return res.status(statusCodes.SUCCESS).json(allUsers);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const updatedUser = await updateUserService(req.params.id, updateData);

    return res.status(statusCodes.SUCCESS).json(updatedUser);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserService(req.params.id);
    return res
      .status(statusCodes.SUCCESS)
      .json({ message: "User Deleted Successfully" });
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

export {
  createUser,
  getPostByUser,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
};
