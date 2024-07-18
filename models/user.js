module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userID: {
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

  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: 'userID'
    });
  };

  return User;
};
