const commentModel = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Posts",
        key: "id",
      },
    },
    parentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Comments",
        key: "id",
      },
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "userID",
      onDelete: 'CASCADE'
    });

    Comment.belongsTo(models.Post, {
      foreignKey: "postID",
      onDelete: 'CASCADE'
    });

    Comment.belongsTo(models.Comment, {
      as: "parentComment",
      foreignKey: "parentID",
      onDelete: 'CASCADE'
    });

    Comment.hasMany(models.Comment, {
      as: "replies",
      foreignKey: "parentID",
      onDelete: 'CASCADE'
    });
  };

  return Comment;
};

export default commentModel;