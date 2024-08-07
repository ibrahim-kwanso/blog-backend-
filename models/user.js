import sequelize from "../sequelize/config.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

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
}, {
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] },
    },
  },
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 3);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 3);
      }
    },
  },
});

User.associate = function (models) {
  User.hasMany(models.Post, {
    foreignKey: "UserId",
    onDelete: "CASCADE",
  });

  User.hasMany(models.Comment, {
    foreignKey: "UserId",
    onDelete: "CASCADE",
  });
};

export default User;
