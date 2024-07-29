const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = function (models) {
    User.hasMany(models.Post, {
      foreignKey: "UserId",
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Comment, {
      foreignKey: "UserId",
      onDelete: 'CASCADE'
    });
  };

  return User;
};

export default userModel;