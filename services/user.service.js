import User from "../models/user.js"
import statusCodes from "../constants/statusCodes.js";
import ApiError from "../utils/apiError.js";

const createUserService = async (username, email, password) => {
  try {
    const user = await User.create({ username, email, password });
    return user;
  } catch (error) {
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const getUserService = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user) return user;

    throw new ApiError("User Not Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const getAllUsersService = async () => {
  try {
    const allUsers = await User.findAll();

    if (allUsers) return allUsers;

    throw new ApiError("No Users Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const updateUserService = async (id, updateData) => {
  try {
    const [updated] = await User.update(updateData, {
      where: {
        id: id,
      },
    });

    if (updated) return getUserService(id);

    throw new ApiError("User Not Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

const deleteUserService = async (id) => {
  try {
    const deletedUser = await User.destroy({
        where: {
          id: id,
        },
      });
  
      if (deletedUser)
        return deletedUser;

    throw new ApiError("User Not Found", statusCodes.NOT_FOUND);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message, statusCodes.BAD_REQUEST);
  }
};

export {
  createUserService,
  getUserService,
  getAllUsersService,
  updateUserService,
  deleteUserService
};
