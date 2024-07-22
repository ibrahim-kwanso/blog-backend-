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
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "Comment not found" });

    return res.status(statusCodes.SUCCESS).json(comment);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    return res.status(statusCodes.SUCCESS).json(comments);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

exports.updateComment = async (req, res) => {
  try {
    const [updated] = await Comment.update({
      content: req.body.content
    }, {
      where:{
        commentID: req.params.id
      }
    })

    if(!updated)
      return res.status(statusCodes.NOT_FOUND).json({error: 'Comment not found'});

    return res.status(statusCodes.SUCCESS).json(updated);

  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        commentID: req.params.id,
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
