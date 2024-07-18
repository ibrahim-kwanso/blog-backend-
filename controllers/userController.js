const { User } = require("../models");
const statusCodes = require("../constants/statusCodes");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(statusCodes.CREATED).json(user);
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(statusCodes.SUCCESS).json(user);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    if (allUsers) {
      res.status(statusCodes.SUCCESS).json(allUsers);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error: "Users not found" });
    }
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        userID: req.params.id
      }
    })
    if(deletedUser){
      res.status(statusCodes.SUCCESS).json(deletedUser);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
}