import Post from "../models/post.js";
import Comment from "../models/comment.js";
import statusCodes from "../constants/statusCodes.js";
import { Op } from "sequelize";
import { appendReplies } from "../utils/index.js";
import ApiError from "../utils/apiError.js";


const createPostService = async (UserId, title, content) => {
  try {
    const post = await Post.create({ UserId, title, content });
    return post;
  } catch (error) {
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const getPostService = async (id) => {
  try {
    const post = await Post.findByPk(id);

    if (post) return post;

    throw new ApiError("Post Not Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const getAllPostsSerivce = async (page, pageSize, title) => {
  try {
    const query = {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    };

    if (title) query.where = { title: { [Op.like]: `%${title}%` } };
    const { count: totalItems, rows: posts } = await Post.findAndCountAll(
      query
    );

    return [totalItems, posts];
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const updatePostService = async (id, updateData) => {
  try {
    const [updated] = await Post.update(updateData, {
      where: {
        id: id,
      },
    });

    if (updated) return getPostService(id);

    throw new ApiError("Post Not Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const deletedPostService = async (id) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: id,
      },
    });

    if (deletedPost) return deletedPost;

    throw new ApiError("Post Not Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const getPostsByUserService = async (UserId, page, pageSize) => {
  try {
    const totalItems = await Post.count({
      where: {
        UserId: UserId,
      },
    });

    const posts = await Post.findAll({
      where: {
        UserId: UserId,
      },
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "content",
            "UserId",
            "PostId",
            "ParentId",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const plainPosts = posts.map((post) => post.toJSON());
    plainPosts.forEach((post) => {
      post.Comments = appendReplies(post.Comments);
    });

    console.log("Total: ", totalItems);

    return [totalItems, plainPosts];
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

export {
  createPostService,
  getPostService,
  getAllPostsSerivce,
  updatePostService,
  deletedPostService,
  getPostsByUserService,
};
