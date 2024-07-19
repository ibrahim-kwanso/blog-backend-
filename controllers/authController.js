const { User } = require("../models");
const jwt = require("jsonwebtoken");
const statusCodes = require("../constants/statusCodes");
const SECRET_KEY = "VerySecret";

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (user) {
      const token = jwt.sign(
        { userID: user.userID, email: user.email },
        SECRET_KEY
      );
      res.status(statusCodes.SUCCESS).json(token);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
