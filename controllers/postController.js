const { Post } = require("../models");
const statusCodes = require("../constants/statusCodes");

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({ userID: req.user.userID, ...req.body });
    res.status(statusCodes.CREATED).json(post);
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "Post not found" });

    return res.status(statusCodes.SUCCESS).json(post);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getPostByUser = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        userID: req.user.userID,
      },
    });

    if (!posts)
      return res.status(statusCodes.NOT_FOUND).json({ error: "Posts not found" });

    return res.status(statusCodes.SUCCESS).json(posts);

  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
