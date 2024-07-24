const appendReplies = (comments) => {
  const map = {};
  const roots = [];

  comments.forEach((comment) => {
    map[comment.commentID] = {
      ...comment,
      replies: [],
    };
  });

  comments.forEach((comment) => {
    if (comment.parentID == null) {
      roots.push(map[comment.commentID]);
    } else {
      if (map[comment.parentID]) {
        map[comment.parentID].replies.push(map[comment.commentID]);
      }
    }
  });

  return roots;
};

const applyPagination = (req, data, page, pageSize, totalItems) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = page;
  const nextPage = page < totalPages ? page + 1 : null;

  const nextUrl = nextPage
    ? `${req.protocol}://${req.get('host')}${req.originalUrl.split('?').shift()}?page=${nextPage}&pageSize=${pageSize}`
    : null;

  return {
    data,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
      pageSize,
      nextUrl
    }
  };
};

export {applyPagination, appendReplies}