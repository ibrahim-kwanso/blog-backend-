import db from "../models/index.js";
import statusCodes from "../constants/statusCodes.js";
import { appendReplies, applyPagination } from "../helper/index.js";

const {User, Post, Comment} = db;

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(statusCodes.CREATED).json(user);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getPostByUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const { count: totalItems, rows: posts } = await Post.findAndCountAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "content",
            "userID",
            "postID",
            "parentID",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const plainPosts = posts.map((post) => post.toJSON());
    plainPosts.forEach((post) => {
      post.Comments = appendReplies(post.Comments);
    });

    return res
      .status(statusCodes.SUCCESS)
      .json(applyPagination(req, plainPosts, page, pageSize, totalItems));
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "User not found" });

    return res.status(statusCodes.SUCCESS).json(user);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUsers = await User.findAll();

    if (!allUsers)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "Users not found" });

    return res.status(statusCodes.SUCCESS).json(allUsers);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const [updated] = await User.update(updateData, {
      where: {
        id: req.params.id,
      },
    });

    if (!updated)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "User not found" });

    return res.status(statusCodes.SUCCESS).json(updated);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedUser)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "User not found" });

    return res.status(statusCodes.SUCCESS).json(deletedUser);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
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
