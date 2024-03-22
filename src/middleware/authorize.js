import jwt from "jsonwebtoken";

import RegisterModel from "../models/auth.js";

export const isAuth = async (req, res, next) => {
  try {
    let token = req?.headers["authorization"]?.split(" ")[1];
    // console.log("2nd", token);
    if (!token) {
       return res
         .status(401)
         .json({ success: false, title: "failed", message: "User Must Login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // console.log(decoded);
    
    // // Check JWT expiration
    // const currentTimestamp = Math.floor(Date.now() / 1000);
    // if (decoded.exp && decoded.exp < currentTimestamp) {
    //   return sendResponse(res, false, "JWT token has expired");
    // }
    const user = await RegisterModel.findById(decoded._id);
    req.user= user
    user.last_login_date = Date.now();
    await user.save();
    // console.log(req.user);
    next();
  } catch (error) {
    next(error)
  }
};


