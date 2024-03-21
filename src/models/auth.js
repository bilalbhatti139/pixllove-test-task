import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema({
  user_name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  creation_date: {
    type: Date,
    default: Date.now
  },
  last_login_date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.isMatchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
};

export default mongoose.model("User", UserSchema);
