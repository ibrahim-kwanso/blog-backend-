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

    if (!comment)
      return res.status(statusCodes.NOT_FOUND).json({ error: "Comment not found" });

    return res.status(statusCodes.SUCCESS).json(comment);
    
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
