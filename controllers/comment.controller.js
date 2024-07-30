import {StatusCodes as statusCodes} from "http-status-codes";
import {
  createCommentService,
  deleteCommentService,
  getAllCommentsService,
  getCommentService,
  updateCommentService,
} from "../services/comment.service.js";

const createComment = async (req, res) => {
  try {
    const { UserId, PostId, content, ParentId } = req.body;
    const comment = await createCommentService(UserId, PostId, content, ParentId);
    res.status(statusCodes.CREATED).json(comment);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await getCommentService(req.params.id);
    return res.status(statusCodes.OK).json(comment);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await getAllCommentsService();
    return res.status(statusCodes.OK).json(comments);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const updated = await updateCommentService(req.params.id, req.body.content);
    return res.status(statusCodes.OK).json(updated);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const deletedComment = deleteCommentService(req.params.id);
    return res
      .status(statusCodes.OK)
      .json({ message: "Comment Deleted OKfully" });
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

export {
  createComment,
  getComment,
  getAllComments,
  updateComment,
  deleteComment,
};
