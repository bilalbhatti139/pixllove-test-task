import Users from "../models/auth.js";
import { sendToken } from "../sender/sender.js";
import { BadRequestError, NotFoundError } from "../sender/customErrors.js";

export const register = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
    };
    const newUser = new Users(data);
    await newUser.save();
    sendToken(res, newUser, "Registration successful");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    // find user is exist or not
    const user = await Users.findOne({ email }).select("+password");
    const isMatch = await user.isMatchPassword(password);
    //  match password
    if (!isMatch) {
      throw new BadRequestError("invalid email & password");
    }
    sendToken(res, user, "Login successful");
  } catch (error) {
    next(error);
  }
};

export const logOut = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      title: "Success",
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      title: "Error",
      message: "An error occurred during logout",
    });
  }
};
