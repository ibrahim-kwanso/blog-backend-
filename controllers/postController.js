const { Post, Comment } = require("../models");
const statusCodes = require("../constants/statusCodes");
const { Op } = require("sequelize");
const {appendReplies} = require('../helper')

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({ userID: req.user.userID, ...req.body });
    res.status(statusCodes.CREATED).json(post);
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { title, page, pageSize } = req.body;
    const query = {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    };

    if (title) query.where = { title: { [Op.like]: `%${title}%` } };

    const posts = await Post.findAll(query);
    return res.status(statusCodes.SUCCESS).json(posts);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { page, pageSize } = req.body;
    const comments = await Comment.findAll({
      where: {
        postID: parseInt(req.params.id),
      },
      // limit: pageSize,
      // offset: (page - 1) * pageSize,
    });
    const plainComments = comments.map(comment => comment.toJSON());
    return res.status(statusCodes.SUCCESS).json(appendReplies(plainComments));
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};


exports.getPost = async (req, res) => {
  try {
    console.log("Heee")
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

exports.updatePost = async (req, res) => {
  try {
    const {title, content} = req.body;
    const updateData = {};
    if(title) updateData.title = title;
    if(content) updateData.content = content;

    const [updated] = await Post.update(updateData, {
      where:{
        postID: req.params.id
      }
    })

    if(!updated)
      return res.status(statusCodes.NOT_FOUND).json({error: 'Post not found'});

    return res.status(statusCodes.SUCCESS).json(updated);

  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        postID: req.params.id,
      },
    });

    if (!deletedPost)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "Post not found" });

    return res.status(statusCodes.SUCCESS).json(deletedPost);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
}
