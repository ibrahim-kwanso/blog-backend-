const appendReplies = (comments) => {
  const map = {};
  const roots = [];

  comments.forEach((comment) => {
    map[comment.id] = {
      ...comment,
      replies: [],
    };
  });

  comments.forEach((comment) => {
    if (comment.ParentId == null) {
      roots.push(map[comment.id]);
    } else {
      if (map[comment.ParentId]) {
        map[comment.ParentId].replies.push(map[comment.id]);
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