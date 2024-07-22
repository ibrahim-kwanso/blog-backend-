exports.appendReplies = (comments) => {
  const map = {};
  const roots = [];

  comments.forEach((comment) => {
    map[comment.commentID] = {
      ...comment,
      replies: [],
    };
  });

  comments.forEach((comment) => {
    if (comment.parentID === null) {
      roots.push(map[comment.commentID]);
    } else {
      if (map[comment.parentID]) {
        map[comment.parentID].replies.push(map[comment.commentID]);
      }
    }
  });

  return roots;
};
