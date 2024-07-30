import {StatusCodes as statusCodes} from "http-status-codes";
import { applyPagination } from "../utils/index.js";
import {
  createPostService,
  getPostService,
  getAllPostsSerivce,
  updatePostService,
  deletedPostService,
} from "../services/post.service.js";

import { getCommentsByPostService } from "../services/comment.service.js";

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await createPostService(req.user.id, title, content);
    res.status(statusCodes.CREATED).json(post);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const title = req.query.title;
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    const [totalItems, posts] = await getAllPostsSerivce(page, pageSize, title);

    return res
      .status(statusCodes.OK)
      .json(applyPagination(req, posts, page, pageSize, totalItems));
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { page, pageSize } = req.body;
    const comments = await getCommentsByPostService(
      req.params.id,
      page,
      pageSize
    );
    return res.status(statusCodes.OK).json(comments);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await getPostService(req.params.id);
    return res.status(statusCodes.OK).json(post);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;

    const updated = await updatePostService(req.params.id, updateData);
    return res.status(statusCodes.OK).json(updated);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await deletedPostService(req.params.id);

    return res
      .status(statusCodes.OK)
      .json({ message: "Post Deleted OKfully" });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export {
  createPost,
  getPost,
  getAllPosts,
  getCommentsByPost,
  updatePost,
  deletePost,
};
