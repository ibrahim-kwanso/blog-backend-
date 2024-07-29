
import sequelize from "../sequelize/config.js";
import { Sequelize } from "sequelize";
import User from "./user.js";
import Post from "./post.js";
import Comment from "./comment.js";

const db = {};


db.User = User;
db.Post = Post;
db.Comment = Comment;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
