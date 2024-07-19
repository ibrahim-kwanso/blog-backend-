const { Post } = require("../models");
const statusCodes = require("../constants/statusCodes");

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({userID: req.user.userID, ...req.body});
    res.status(statusCodes.CREATED).json(post);
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.status(statusCodes.SUCCESS).json(post);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getPostByUser = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        userID: req.user.userID,
      },
    });
    if (posts) {
      res.status(statusCodes.SUCCESS).json(posts);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error: "Posts not found" });
    }
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
