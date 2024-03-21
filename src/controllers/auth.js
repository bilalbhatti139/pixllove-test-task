import auth  from "../models/auth";

export const register = async (req, res) => {
    try {
      console.log("Register api body", req.body);
      let user = new Users(data);
      sendToken(res, user, "Register Successfully");
    } catch (error) {
      return sendError(res, error);
    }
  };
  
  // done
  // loging  using username
  export const login = async (req, res) => {
    try {
      let { email, password } = req.body;

      // find user is exist or not
      const user = await Users.findOne({ email }).select("+password");
  
      // if not user found
      if (!user || user.isDelete) {
        return sendResponse(res, false, "User not Exist!");
      }
      // check if password is correct
      const isMatch = await user.isMatchPassword(password);
      //  match password
      if (!isMatch) {
        return sendResponse(res, false, "invalid email & password");
      }
  
      sendToken(res, user, "Login Success");
    } catch (error) {
      return sendError(res, error);
    }
  };
  