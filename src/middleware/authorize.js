import jwt from "jsonwebtoken";

import RegisterModel from "../models/auth.js";

export const isAuth = async (req, res, next) => {
  try {
    let token = req?.headers["authorization"]?.split(" ")[1];
    // console.log("2nd", token);
    if (!token) {
      return sendResponse(res, false, "You must be logged in");
    }

    // console.log(token);
    console.log("key is :",process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // console.log(decoded);
    
    // // Check JWT expiration
    // const currentTimestamp = Math.floor(Date.now() / 1000);
    // if (decoded.exp && decoded.exp < currentTimestamp) {
    //   return sendResponse(res, false, "JWT token has expired");
    // }
    req.user = await RegisterModel.findById(decoded._id);

    // console.log(req.user);
    next();
  } catch (error) {
    next(error)
  }
};


