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

    if(!user) return res.status(statusCodes.NOT_FOUND).json({ error: "User not found" });

    return res.status(statusCodes.SUCCESS).json(user);
    
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const allUsers = await User.findAll();

    if(!allUsers) return res.status(statusCodes.NOT_FOUND).json({ error: "Users not found" });
    
    return res.status(statusCodes.SUCCESS).json(allUsers);
    
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        userID: req.params.id
      }
    })

    if(!deletedUser) return res.status(statusCodes.NOT_FOUND).json({ error: "User not found" });

    return res.status(statusCodes.SUCCESS).json(deletedUser);
    
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
}