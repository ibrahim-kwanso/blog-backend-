const { Comment } = require("../models");
const statusCodes = require("../constants/statusCodes");

exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(statusCodes.CREATED).json(comment);
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      res.status(statusCodes.SUCCESS).json(comment);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};