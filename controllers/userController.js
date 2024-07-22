const { User, Post, Comment } = require("../models");
const statusCodes = require("../constants/statusCodes");
const { where } = require("sequelize");
const { appendReplies } = require("../helper");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(statusCodes.CREATED).json(user);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getPostByUser = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        userID: req.params.id,
      },
      include: [
        {
          model: Comment,
          attributes: [
            "commentID",
            "content",
            "userID",
            "postID",
            "parentID",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });

    const plainPosts = posts.map((post) => post.toJSON());
    plainPosts.forEach((post) => {
      post.Comments = appendReplies(post.Comments);
    });

    return res.status(statusCodes.SUCCESS).json(plainPosts);
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
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

exports.getAllUser = async (req, res) => {
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

exports.updateUser = async (req, res) => {
  try {
    const {email, password, username} = req.body;
    const updateData = {};
    if(username) updateData.username = username;
    if(email) updateData.email = email;
    if(password) updateData.password = password;

    const [updated] = await User.update(updateData, {
      where:{
        userID: req.params.id
      }
    })

    if(!updated)
      return res.status(statusCodes.NOT_FOUND).json({error: 'User not found'});

    return res.status(statusCodes.SUCCESS).json(updated);

  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        userID: req.params.id,
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
