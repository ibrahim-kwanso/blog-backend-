import Comment from "../models/comment.js";
import statusCodes from "../constants/statusCodes.js";
import ApiError from "../utils/apiError.js";
import { appendReplies } from "../utils/index.js";

const createCommentService = async (UserId, PostId, content, ParentId) => {
  try {
    
    if(!ParentId) return await Comment.create({ UserId, PostId, content, ParentId });

    const parentComment = await Comment.findByPk(ParentId);
    if (parentComment && parentComment.PostId == PostId)
      return await Comment.create({ UserId, PostId, content, ParentId });

    throw new ApiError(
      `Could not find parent comment (id:${ParentId})`,
      statusCodes.NOT_FOUND
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const getCommentService = async (id) => {
  try {
    const comment = await Comment.findByPk(id);

    if (comment) return comment;

    throw new ApiError("Comment Not Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const getAllCommentsService = async () => {
  try {
    const allComments = await Comment.findAll();
    if (allComments) return allComments;

    throw new ApiError("No Comments Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const updateCommentService = async (id, content) => {
  try {
    const [updated] = await Comment.update(
      {
        content: content,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (updated) return getCommentService(id);

    throw new ApiError("Comment Not Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const deleteCommentService = async (id) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: id,
      },
    });

    if (deletedComment) return deletedComment;

    throw new ApiError("Comment Not Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const getCommentsByPostService = async (PostId, page, pageSize) => {
  try {
    const comments = await Comment.findAll({
      where: {
        PostId: PostId,
      },
      // limit: pageSize,
      // offset: (page - 1) * pageSize,
    });
    const plainComments = comments.map((comment) => comment.toJSON());
    return appendReplies(plainComments);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

export {
  createCommentService,
  getCommentService,
  getAllCommentsService,
  updateCommentService,
  deleteCommentService,
  getCommentsByPostService,
};
