import db from "../models/index.js";
import statusCodes from "../constants/statusCodes.js";

const { Comment } = db;

const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(statusCodes.CREATED).json(comment);
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "Comment not found" });

    return res.status(statusCodes.SUCCESS).json(comment);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    return res.status(statusCodes.SUCCESS).json(comments);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const [updated] = await Comment.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updated)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "Comment not found" });

    return res.status(statusCodes.SUCCESS).json(updated);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedComment)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "Comment not found" });

    return res.status(statusCodes.SUCCESS).json(deletedComment);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export {
  createComment,
  getComment,
  getAllComments,
  updateComment,
  deleteComment,
};
